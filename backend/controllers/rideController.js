const {
    createRide,
    getAvailableRides
} = require("../models/rideModel");

// Create Ride
const createRideController = async (req, res) => {

    try {

        const {
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare
        } = req.body;

        const ride = await createRide(
            req.user.id,
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare
        );

        res.status(201).json({
            success: true,
            message: "Ride created successfully",
            ride
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get Available Rides
const getAllRidesController = async (req, res) => {

    try {

        const rides = await getAvailableRides();

        res.status(200).json({
            success: true,
            rides
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createRideController,
    getAllRidesController
};