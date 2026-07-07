const pool = require("../database/db");

const getDriverDashboard = async (driver_id) => {

    // Total rides
    const ridesResult = await pool.query(
        `SELECT COUNT(*) AS total_rides
         FROM rides
         WHERE rider_id = $1`,
        [driver_id]
    );

    // Active rides
    const activeRidesResult = await pool.query(
        `SELECT COUNT(*) AS active_rides
         FROM rides
         WHERE rider_id = $1
         AND status = 'available'`,
        [driver_id]
    );

    // Total bookings
    const bookingsResult = await pool.query(
        `SELECT COUNT(*) AS total_bookings
         FROM bookings b
         JOIN rides r
         ON b.ride_id = r.id
         WHERE r.rider_id = $1`,
        [driver_id]
    );

    // Total earnings
    const earningsResult = await pool.query(
        `SELECT COALESCE(SUM(p.amount),0) AS total_earnings
         FROM payments p
         JOIN bookings b
         ON p.booking_id = b.id
         JOIN rides r
         ON b.ride_id = r.id
         WHERE r.rider_id = $1
         AND p.payment_status = 'success'`,
        [driver_id]
    );

    return {
        total_rides: ridesResult.rows[0].total_rides,
        active_rides: activeRidesResult.rows[0].active_rides,
        total_bookings: bookingsResult.rows[0].total_bookings,
        total_earnings: earningsResult.rows[0].total_earnings
    };
};

const getRiderDashboard = async (user_id) => {

    const totalBookingsResult = await pool.query(
        `SELECT COUNT(*) AS total_bookings
         FROM bookings
         WHERE passenger_id = $1`,
        [user_id]
    );

    const confirmedBookingsResult = await pool.query(
        `SELECT COUNT(*) AS confirmed_bookings
         FROM bookings
         WHERE passenger_id = $1
         AND booking_status = 'confirmed'`,
        [user_id]
    );

    const cancelledBookingsResult = await pool.query(
        `SELECT COUNT(*) AS cancelled_bookings
         FROM bookings
         WHERE passenger_id = $1
         AND booking_status = 'cancelled'`,
        [user_id]
    );

    const pendingBookingsResult = await pool.query(
        `SELECT COUNT(*) AS pending_bookings
         FROM bookings
         WHERE passenger_id = $1
         AND booking_status = 'pending'`,
        [user_id]
    );

    const totalSpentResult = await pool.query(
        `SELECT COALESCE(SUM(amount),0) AS total_spent
         FROM payments
         WHERE user_id = $1
         AND payment_status = 'success'`,
        [user_id]
    );

    return {
        total_bookings: totalBookingsResult.rows[0].total_bookings,
        confirmed_bookings: confirmedBookingsResult.rows[0].confirmed_bookings,
        cancelled_bookings: cancelledBookingsResult.rows[0].cancelled_bookings,
        pending_bookings: pendingBookingsResult.rows[0].pending_bookings,
        total_spent: totalSpentResult.rows[0].total_spent
    };

};

const getAdminDashboard = async () => {

    const usersResult = await pool.query(
        `SELECT COUNT(*) AS total_users
         FROM users`
    );

    const ridersResult = await pool.query(
        `SELECT COUNT(*) AS total_riders
         FROM users
         WHERE role = 'rider'`
    );

    const driversResult = await pool.query(
        `SELECT COUNT(*) AS total_drivers
         FROM users
         WHERE role = 'driver'`
    );

    const ridesResult = await pool.query(
        `SELECT COUNT(*) AS total_rides
         FROM rides`
    );

    const bookingsResult = await pool.query(
        `SELECT COUNT(*) AS total_bookings
         FROM bookings`
    );

    const revenueResult = await pool.query(
        `SELECT COALESCE(SUM(amount),0) AS total_revenue
         FROM payments
         WHERE payment_status = 'success'`
    );

    const successPaymentsResult = await pool.query(
        `SELECT COUNT(*) AS successful_payments
         FROM payments
         WHERE payment_status = 'success'`
    );

    const pendingPaymentsResult = await pool.query(
        `SELECT COUNT(*) AS pending_payments
         FROM payments
         WHERE payment_status = 'pending'`
    );

    return {

        total_users: usersResult.rows[0].total_users,

        total_riders: ridersResult.rows[0].total_riders,

        total_drivers: driversResult.rows[0].total_drivers,

        total_rides: ridesResult.rows[0].total_rides,

        total_bookings: bookingsResult.rows[0].total_bookings,

        total_revenue: revenueResult.rows[0].total_revenue,

        successful_payments:
            successPaymentsResult.rows[0].successful_payments,

        pending_payments:
            pendingPaymentsResult.rows[0].pending_payments

    };

};

const getMonthlyAnalytics = async () => {

    const revenueResult = await pool.query(
        `SELECT
            TO_CHAR(created_at, 'Mon YYYY') AS month,
            COALESCE(SUM(amount), 0) AS revenue
         FROM payments
         WHERE payment_status = 'success'
         GROUP BY month, DATE_TRUNC('month', created_at)
         ORDER BY DATE_TRUNC('month', created_at)`
    );

    const bookingsResult = await pool.query(
        `SELECT
            TO_CHAR(created_at, 'Mon YYYY') AS month,
            COUNT(*) AS bookings
         FROM bookings
         GROUP BY month, DATE_TRUNC('month', created_at)
         ORDER BY DATE_TRUNC('month', created_at)`
    );

    const usersResult = await pool.query(
        `SELECT
            TO_CHAR(created_at, 'Mon YYYY') AS month,
            COUNT(*) AS users
         FROM users
         GROUP BY month, DATE_TRUNC('month', created_at)
         ORDER BY DATE_TRUNC('month', created_at)`
    );

    return {
        monthly_revenue: revenueResult.rows,
        monthly_bookings: bookingsResult.rows,
        monthly_users: usersResult.rows
    };

};

module.exports = {
    getDriverDashboard,
    getRiderDashboard,
    getAdminDashboard,
    getMonthlyAnalytics
};