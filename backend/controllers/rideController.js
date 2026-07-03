const {
    createRide,
    getAllRides,
    getRideById,
    updateRide,
    deleteRide,
    reduceAvailableSeats,
    searchRides
} = require("../models/rideModel");

const createRideController = async (req, res) => {

    try {

        const {
            rider_id,
            pickup_location,
            destination,
            ride_date,
            ride_time,
            available_seats,
            fare
        } = req.body;

        if (
            !rider_id ||
            !pickup_location ||
            !destination ||
            !ride_date ||
            !ride_time ||
            !available_seats ||
            !fare
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

const updateRideController = async (req, res) => {

    try {

        const { id } = req.params;

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

        if (!ride) {
            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });
        }

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

const deleteRideController = async (req, res) => {

    try {

        const { id } = req.params;

        const ride = await deleteRide(id);

        if (!ride) {
            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Ride deleted successfully",
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
const searchRidesController = async (req, res) => {

    try {

        const {
            pickup_location,
            destination,
            ride_date,
            seats
        } = req.query;

        if (!pickup_location || !destination || !ride_date || !seats) {

            return res.status(400).json({
                success: false,
                message: "Pickup, destination, ride date and seats are required"
            });

        }

        if (isNaN(seats) || Number(seats) <= 0){
            return res.status(400).json({
                success: false,
                message: "Seats must be a positive number"
            });
        }

        const rides = await searchRides(
            pickup_location,
            destination,
            ride_date,
            seats
        );

        if (rides.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No rides found"
            });
        }

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
    updateRideController,
    deleteRideController,
    searchRidesController
};