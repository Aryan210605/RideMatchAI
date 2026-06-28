const pool = require("../database/db");

// Create Ride
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
        (rider_id,pickup_location,destination,ride_date,ride_time,available_seats,fare)
        VALUES($1,$2,$3,$4,$5,$6,$7)
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

// Get All Available Rides
const getAvailableRides = async () => {

    const result = await pool.query(
        `SELECT *
         FROM rides
         WHERE status='available'
         ORDER BY created_at DESC`
    );

    return result.rows;
};

module.exports = {
    createRide,
    getAvailableRides
};