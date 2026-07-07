const express = require("express");

const router = express.Router();

const {
    createBookingController,
    getAllBookingsController,
    getBookingByIdController,
    cancelBookingController,
    getBookingsByPassengerIdController,
    adminCancelBookingController,
    adminDeleteBookingController
} = require("../controllers/bookingController");

const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");


// =====================
// USER ROUTES
// =====================

// Create Booking
router.post(
    "/create",
    authenticateToken,
    authorizeRole("rider"),
    createBookingController
);

// Get Booking By ID
router.get(
    "/:id",
    authenticateToken,
    getBookingByIdController
);

// Cancel Own Booking
router.put(
    "/cancel/:id",
    authenticateToken,
    authorizeRole("rider"),
    cancelBookingController
);

// Get Logged-in Passenger Bookings
router.get(
    "/passenger/:id",
    authenticateToken,
    getBookingsByPassengerIdController
);


// =====================
// ADMIN ROUTES
// =====================

// Get All Bookings
router.get(
    "/admin/all",
    authenticateToken,
    authorizeRole("admin"),
    getAllBookingsController
);

// Cancel Any Booking
router.put(
    "/admin/cancel/:id",
    authenticateToken,
    authorizeRole("admin"),
    adminCancelBookingController
);

// Delete Any Booking
router.delete(
    "/admin/delete/:id",
    authenticateToken,
    authorizeRole("admin"),
    adminDeleteBookingController
);

module.exports = router;