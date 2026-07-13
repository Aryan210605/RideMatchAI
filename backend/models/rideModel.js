const pool = require("../database/db");

const createRide = async (
    rider_id,
    pickup_location,
    destination,
    ride_date,
    ride_time,
    available_seats,
    fare
) => {

    const result = await pool.query(
        `INSERT INTO rides
        (
            rider_id,
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare
        )

        VALUES
        ($1,$2,$3,$4,$5,$6,$7)

        RETURNING *`,
        [
            rider_id,
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare
        ]
    );

    return result.rows[0];
};
const getAllRides = async () => {

    const result = await pool.query(
        `SELECT *
        FROM rides
        WHERE available_seats > 0
        ORDER BY ride_date ASC, ride_time ASC`
    );

    return result.rows;

};

const getRideById = async (id) => {

    const result = await pool.query(
        `SELECT * FROM rides WHERE id = $1`,
        [id]
    );

    return result.rows[0];

};

const updateRide = async (
    id,
    pickup_location,
    destination,
    ride_date,
    ride_time,
    available_seats,
    fare
) => {

    const result = await pool.query(
        `UPDATE rides
         SET
            pickup_location = $1,
            destination = $2,
            ride_date = $3,
            ride_time = $4,
            available_seats = $5,
            fare = $6
         WHERE id = $7
         RETURNING *`,
        [
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare,
            id
        ]
    );

    return result.rows[0];
};

const deleteRide = async (id) => {

    const result = await pool.query(
        `DELETE FROM rides
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

const searchRides = async (
    pickup_location,
    destination,
    ride_date,
    seats
) => {

    const result = await pool.query(
        `
        SELECT *
        FROM rides
        WHERE pickup_location ILIKE $1
        AND destination ILIKE $2
        AND ride_date = $3
        AND available_seats >= $4
        ORDER BY fare ASC
        `,
        [
            `%${pickup_location}%`,
            `%${destination}%`,
            ride_date,
            Number(seats)
        ]
    );

    return result.rows;

};

const reduceAvailableSeats = async (ride_id, seats_booked) => {

    const result = await pool.query(
        `UPDATE rides
         SET available_seats = available_seats - $1
         WHERE id = $2
         AND available_seats >= $1
         RETURNING *`,
        [seats_booked, ride_id]
    );

    return result.rows[0];

};

const getDriverStatistics = async (driverId) => {

    const result = await pool.query(

        `SELECT
            COUNT(*) AS total_rides,
            COALESCE(SUM(fare),0) AS total_fare,
            COALESCE(SUM(available_seats),0) AS seats_left
         FROM rides
         WHERE rider_id = $1`,

        [driverId]

    );

    return result.rows[0];

};

// ===========================
// Get My Rides
// ===========================

const getMyRides = async (rider_id) => {

    const result = await pool.query(

        `SELECT *
         FROM rides
         WHERE rider_id = $1
         ORDER BY id DESC`,

        [rider_id]

    );

    return result.rows;

};


module.exports = {
    createRide,
    getAllRides,
    getRideById,
    updateRide,
    deleteRide,
    reduceAvailableSeats,
    searchRides,
    getDriverStatistics,
    getMyRides
};