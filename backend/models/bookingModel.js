const pool = require("../database/db");

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
            seats_booked
        )

        VALUES ($1, $2, $3)

        RETURNING *`,
        [
            ride_id,
            passenger_id,
            seats_booked
        ]
    );

    return result.rows[0];
};

const getAllBookings = async () => {

    const result = await pool.query(
        `SELECT * FROM bookings
         ORDER BY id ASC`
    );

    return result.rows;

};

const getBookingById = async (id) => {

    const result = await pool.query(
        `SELECT * FROM bookings
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];

};

const cancelBooking = async (id) => {

    const result = await pool.query(
        `UPDATE bookings
         SET booking_status = 'cancelled'
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];

};

const getBookingsByPassengerId = async (passenger_id) => {

    const result = await pool.query(
        `SELECT *
         FROM bookings
         WHERE passenger_id = $1
         ORDER BY id ASC`,
        [passenger_id]
    );

    return result.rows;

};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking,
    getBookingsByPassengerId
};