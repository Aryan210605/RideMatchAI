const express = require("express");

const router = express.Router();

const {
    createBookingController,
    getMyBookingsController,
    cancelBookingController
} = require("../controllers/bookingController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

// ============================
// Book Ride
// ============================

router.post(
    "/book",
    authenticateToken,
    createBookingController
);

// ============================
// My Bookings
// ============================

router.get(
    "/my-bookings",
    authenticateToken,
    getMyBookingsController
);

// ============================
// Cancel Booking
// ============================

router.put(
    "/cancel/:id",
    authenticateToken,
    cancelBookingController
);

module.exports = router;