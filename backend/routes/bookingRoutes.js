const express = require("express");
const router = express.Router();

const {
    createBookingController,
    getAllBookingsController,
    getBookingByIdController,
    cancelBookingController,
    getBookingsByPassengerIdController
} = require("../controllers/bookingController");

const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.post(
    "/create",
    authenticateToken,
    authorizeRole("rider"),
    createBookingController
);

router.get("/", authenticateToken, getAllBookingsController);

router.get(
    "/passenger/:passenger_id",
    authenticateToken,
    getBookingsByPassengerIdController
);

router.get("/:id", authenticateToken, getBookingByIdController);

router.put(
    "/cancel/:id",
    authenticateToken,
    authorizeRole("rider"),
    cancelBookingController
);

module.exports = router;