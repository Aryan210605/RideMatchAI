const pool = require("../database/db");

// ===========================
// Create Payment
// ===========================

const createPayment = async (
    booking_id,
    user_id,
    amount,
    currency = "INR",
    razorpay_order_id = null,
    razorpay_payment_id = null,
    razorpay_signature = null,
    payment_status = "PENDING",
    payment_method = "RAZORPAY"
) => {

    const result = await pool.query(

        `INSERT INTO payments
        (
            booking_id,
            user_id,
            amount,
            currency,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            payment_status,
            payment_method
        )

        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)

        RETURNING *`,

        [
            booking_id,
            user_id,
            amount,
            currency,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            payment_status,
            payment_method
        ]

    );

    return result.rows[0];

};

// ===========================
// Get My Payments
// ===========================

const getMyPayments = async (user_id) => {

    const result = await pool.query(

        `SELECT
            p.id,
            p.booking_id,
            p.amount,
            p.currency,
            p.payment_status,
            p.payment_method,
            p.created_at,
            b.ride_id,
            b.seats_booked
        FROM payments p
        JOIN bookings b
            ON p.booking_id = b.id
        WHERE p.user_id = $1
        ORDER BY p.id DESC`,

        [user_id]

    );

    return result.rows;

};

// ===========================
// Get Payment By ID
// ===========================

const getPaymentById = async (id) => {

    const result = await pool.query(

        `SELECT *
         FROM payments
         WHERE id = $1`,

        [id]

    );

    return result.rows[0];

};

const getPaymentByBookingId = async (booking_id) => {

    const result = await pool.query(

        `SELECT *
         FROM payments
         WHERE booking_id = $1
         AND payment_status = 'SUCCESS'`,

        [booking_id]

    );

    return result.rows[0];

};

module.exports = {
    createPayment,
    getMyPayments,
    getPaymentById,
    getPaymentByBookingId
};