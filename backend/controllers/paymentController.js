const Razorpay = require("razorpay");
const crypto = require("crypto");

const {
    createPayment,
    updatePayment,
    getPaymentByBookingId,
    getPaymentByOrderId,
    getPaymentsByUserId
} = require("../models/paymentModel");

const {
    confirmBooking
} = require("../models/bookingModel");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrderController = async (req, res) => {

    try {

        const {
            booking_id,
            user_id,
            amount
        } = req.body;

        if (!booking_id || !user_id || !amount) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `booking_${booking_id}`
        };

        const order = await razorpay.orders.create(options);

        const payment = await createPayment(
            booking_id,
            user_id,
            amount,
            "INR",
            order.id,
            "pending"
        );

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
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

const verifyPaymentController = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            payment_method
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {

            return res.status(400).json({
                success: false,
                message: "All payment details are required"
            });

        }

        const payment = await getPaymentByOrderId(
            razorpay_order_id
        );

        if (!payment) {

            return res.status(404).json({
                success: false,
                message: "Payment record not found"
            });

        }

        // Generate expected signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id +
                "|" +
                razorpay_payment_id
            )
            .digest("hex");

        // Compare signatures
        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });

        }

        const updatedPayment = await updatePayment(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            payment_method || "UPI",
            "success"
        );

        const booking = await confirmBooking(
            payment.booking_id
        );

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            payment: updatedPayment,
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

const getUserPaymentsController = async (req, res) => {

    try {
        console.log("Logged in user:", req.user);

        const user_id = req.user.id;

        const payments = await getPaymentsByUserId(user_id);

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

const getPaymentHistoryController = async (req, res) => {

    try {

        const { booking_id } = req.params;

        const payments = await getPaymentByBookingId(
            booking_id
        );

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
    createOrderController,
    verifyPaymentController,
    getPaymentHistoryController,
    getUserPaymentsController
};