const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createRideController,
    getAllRidesController
} = require("../controllers/rideController");

// Create Ride
router.post(
    "/create",
    verifyToken,
    createRideController
);

// View Rides
router.get(
    "/all",
    verifyToken,
    getAllRidesController
);

module.exports = router;