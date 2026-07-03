const pool = require("../database/db");

// ==========================
// Create Payment
// ==========================
const createPayment = async (
    booking_id,
    user_id,
    amount,
    currency,
    razorpay_order_id,
    payment_status
) => {

    const result = await pool.query(
        `INSERT INTO payments
        (
            booking_id,
            user_id,
            amount,
            currency,
            razorpay_order_id,
            payment_status
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [
            booking_id,
            user_id,
            amount,
            currency,
            razorpay_order_id,
            payment_status
        ]
    );

    return result.rows[0];
};

// ==========================
// Update Payment After Success
// ==========================
const updatePayment = async (
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    payment_method,
    payment_status
) => {

    const result = await pool.query(
        `UPDATE payments
        SET
            razorpay_payment_id = $1,
            razorpay_signature = $2,
            payment_method = $3,
            payment_status = $4
        WHERE razorpay_order_id = $5
        RETURNING *`,
        [
            razorpay_payment_id,
            razorpay_signature,
            payment_method,
            payment_status,
            razorpay_order_id
        ]
    );

    return result.rows[0];
};

// ==========================
// Get Payment by Booking ID
// ==========================
const getPaymentByBookingId = async (booking_id) => {

    const result = await pool.query(
        `SELECT *
         FROM payments
         WHERE booking_id = $1`,
        [booking_id]
    );

    return result.rows;
};

// ==========================
// Get Payment by Order ID
// ==========================
const getPaymentByOrderId = async (razorpay_order_id) => {

    const result = await pool.query(
        `SELECT *
         FROM payments
         WHERE razorpay_order_id = $1`,
        [razorpay_order_id]
    );

    return result.rows[0];
};

// ==========================
// Get Payment by Payment ID
// ==========================
const getPaymentByPaymentId = async (razorpay_payment_id) => {

    const result = await pool.query(
        `SELECT *
         FROM payments
         WHERE razorpay_payment_id = $1`,
        [razorpay_payment_id]
    );

    return result.rows[0];
};

// ==========================
// Get All Payments of User
// ==========================
const getPaymentsByUserId = async (user_id) => {

    const result = await pool.query(
        `SELECT *
         FROM payments
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [user_id]
    );

    return result.rows;
};

// ==========================
// Export
// ==========================
module.exports = {
    createPayment,
    updatePayment,
    getPaymentByBookingId,
    getPaymentByOrderId,
    getPaymentByPaymentId,
    getPaymentsByUserId
};