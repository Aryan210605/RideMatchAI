const {
    createRide,
    getAllRides,
    getRideById,
    updateRide,
    deleteRide,
    reduceAvailableSeats,
    searchRides,
    getDriverStatistics,
    getMyRides
} = require("../models/rideModel");

// ==========================
// Create Ride
// ==========================

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

        const rider_id = req.user.id;

        if (
            !pickup_location ||
            !destination ||
            !ride_date ||
            !ride_time ||
            available_seats == null ||
            fare == null
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const ride = await createRide(
            rider_id,
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

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Get All Rides
// ==========================

const getAllRidesController = async (req, res) => {

    try {

        const rides = await getAllRides();

        res.status(200).json({
            success: true,
            total: rides.length,
            rides
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Get Ride By ID
// ==========================

const getRideByIdController = async (req, res) => {

    try {

        const { id } = req.params;

        const ride = await getRideById(id);

        if (!ride) {

            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });

        }

        res.status(200).json({
            success: true,
            ride
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Update Ride
// ==========================

const updateRideController = async (req, res) => {

    try {

        const { id } = req.params;

        const existingRide = await getRideById(id);

        if (!existingRide) {

            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });

        }

        const {
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare
        } = req.body;

        const ride = await updateRide(
            id,
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare
        );

        res.status(200).json({
            success: true,
            message: "Ride updated successfully",
            ride
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Delete Ride
// ==========================

const deleteRideController = async (req, res) => {

    try {

        const { id } = req.params;

        const existingRide = await getRideById(id);

        if (!existingRide) {

            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });

        }

        await deleteRide(id);

        res.status(200).json({
            success: true,
            message: "Ride deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Search Ride
// ==========================

const searchRidesController = async (req, res) => {

    try {

        const {
            pickup_location,
            destination,
            ride_date,
            seats
        } = req.query;

        if (
            !pickup_location ||
            !destination ||
            !ride_date ||
            !seats
        ) {

            return res.status(400).json({
                success: false,
                message: "All search fields are required"
            });

        }

        const rides = await searchRides(
            pickup_location,
            destination,
            ride_date,
            seats
        );

        res.status(200).json({
            success: true,
            total: rides.length,
            rides
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getDriverStatisticsController = async (req, res) => {

    try {

        const stats = await getDriverStatistics(req.user.id);

        res.status(200).json({
            success: true,
            stats
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ===========================
// Get My Rides
// ===========================

const getMyRidesController = async (req, res) => {

    try {

        const rides = await getMyRides(req.user.id);

        res.status(200).json({

            success: true,
            total: rides.length,
            rides

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

module.exports = {
    createRideController,
    getAllRidesController,
    getRideByIdController,
    searchRidesController,
    updateRideController,
    deleteRideController,
    getDriverStatisticsController,
    getMyRidesController
};