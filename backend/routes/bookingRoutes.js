const express = require("express");
const router = express.Router();

const {
    createBookingController,
    getAllBookingsController,
    getBookingByIdController,
    cancelBookingController,
    getBookingsByPassengerIdController
} = require("../controllers/bookingController");

router.post("/create", createBookingController);

router.get("/", getAllBookingsController);

router.get("/passenger/:passenger_id", getBookingsByPassengerIdController);

router.get("/:id", getBookingByIdController);

router.put("/cancel/:id", cancelBookingController);

module.exports = router;