const {
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking,
    getBookingsByPassengerId,
    confirmBooking,
    adminCancelBooking,
    adminDeleteBooking
} = require("../models/bookingModel");

const {
    reduceAvailableSeats,
    getRideById
} = require("../models/rideModel");

const createBookingController = async (req, res) => {

    try {

        const {
            ride_id,
            passenger_id,
            seats_booked
        } = req.body;

        if (
            !ride_id ||
            !passenger_id ||
            !seats_booked
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const ride = await getRideById(ride_id);

        if (!ride) {

            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });

        }

        if (ride.available_seats < seats_booked) {

            return res.status(400).json({
                success: false,
                message: "Not enough seats available"
            });

        }

        const booking = await createBooking(
            ride_id,
            passenger_id,
            seats_booked
        );

        await reduceAvailableSeats(
            ride_id,
            seats_booked
        );

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getAllBookingsController = async (req, res) => {

    try {

        const bookings = await getAllBookings();

        res.status(200).json({
            success: true,
            total: bookings.length,
            bookings
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getBookingByIdController = async (req, res) => {

    try {

        const { id } = req.params;

        const booking = await getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const cancelBookingController = async (req, res) => {

    try {

        const { id } = req.params;

        const booking = await cancelBooking(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getBookingsByPassengerIdController = async (req, res) => {

    try {

        const { id } = req.params;

        const bookings = await getBookingsByPassengerId(id);

        res.status(200).json({
            success: true,
            total: bookings.length,
            bookings
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const adminCancelBookingController = async (req, res) => {

    try {

        const booking = await adminCancelBooking(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking cancelled",
            booking
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const adminDeleteBookingController = async (req, res) => {

    try {

        const booking = await adminDeleteBooking(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking deleted"
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
    createBookingController,
    getAllBookingsController,
    getBookingByIdController,
    cancelBookingController,
    getBookingsByPassengerIdController,
    getAllBookingsController,
    adminCancelBookingController,
    adminDeleteBookingController
};