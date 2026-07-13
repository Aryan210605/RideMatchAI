const {
    createPayment,
    getMyPayments,
    getPaymentById,
    getPaymentByBookingId
} = require("../models/paymentModel");

const { getBookingById } = require("../models/bookingModel");
const { getRideById } = require("../models/rideModel");

// ===============================
// Create Payment
// ===============================

const createPaymentController = async (req, res) => {

    try {

        const { booking_id } = req.body;

        const user_id = req.user.id;

        if (!booking_id) {

            return res.status(400).json({
                success: false,
                message: "Booking ID is required"
            });

        }

        // Get Booking
        const booking = await getBookingById(booking_id);

        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });

        }

        // Check if payment already exists
        const existingPayment = await getPaymentByBookingId(booking_id);

        if (existingPayment) {

            return res.status(400).json({
                success: false,
                message: "Payment already completed"
            });

        }

        // Get Ride Details
        const ride = await getRideById(booking.ride_id);

        if (!ride) {

            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });

        }

        // Calculate Amount using Ride Fare
        const amount = booking.seats_booked * ride.fare;

        // Create Payment
        const payment = await createPayment(
            booking_id,
            user_id,
            amount,
            "INR",
            null,
            null,
            null,
            "SUCCESS",
            "MANUAL"
        );

        res.status(201).json({
            success: true,
            message: "Payment Successful",
            payment
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ===============================
// Get My Payments
// ===============================

const getMyPaymentsController = async (req, res) => {

    try {

        const user_id = req.user.id;

        const payments = await getMyPayments(user_id);

        res.status(200).json({
            success: true,
            total: payments.length,
            payments
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
    createPaymentController,
    getMyPaymentsController
};