const pool = require("../database/db");

// ===========================
// Create Booking
// ===========================

const createBooking = async (
    ride_id,
    passenger_id,
    seats_booked
) => {

    const result = await pool.query(

        `INSERT INTO bookings
        (
            ride_id,
            passenger_id,
            seats_booked,
            booking_status,
            booked_at
        )

        VALUES
        ($1,$2,$3,'Booked',NOW())

        RETURNING *`,

        [
            ride_id,
            passenger_id,
            seats_booked
        ]

    );

    return result.rows[0];

};

// ===========================
// My Bookings
// ===========================

const getMyBookings = async (passenger_id) => {

    const result = await pool.query(

        `SELECT b.*
         FROM bookings b
         WHERE b.passenger_id = $1
         AND b.booking_status = 'Booked'
         AND b.id NOT IN
         (
             SELECT booking_id
             FROM payments
             WHERE payment_status = 'SUCCESS'
         )
         ORDER BY b.id DESC`,

        [passenger_id]

    );

    return result.rows;

};

// ===========================
// Booking By ID
// ===========================

const getBookingById = async (id) => {

    const result = await pool.query(

        `SELECT *
        FROM bookings
        WHERE id=$1`,

        [id]

    );

    return result.rows[0];

};

// ===========================
// Cancel Booking
// ===========================

const cancelBooking = async (id) => {

    const result = await pool.query(

        `UPDATE bookings

        SET booking_status='Cancelled'

        WHERE id=$1

        RETURNING *`,

        [id]

    );

    return result.rows[0];

};

module.exports = {

    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking

};