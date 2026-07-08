const express = require("express");
const router = express.Router();

const {
    createRideController,
    getAllRidesController,
    getRideByIdController,
    updateRideController,
    deleteRideController,
    searchRidesController
} = require("../controllers/rideController");

const { authenticateToken } = require("../middleware/authMiddleware");

// Create Ride
router.post(
    "/create",
    authenticateToken,
    createRideController
);

// Get All Rides
router.get(
    "/",
    authenticateToken,
    getAllRidesController
);

// Search Rides
router.get(
    "/search",
    authenticateToken,
    searchRidesController
);

// Get Ride By ID
router.get(
    "/:id",
    authenticateToken,
    getRideByIdController
);

// Update Ride
router.put(
    "/:id",
    authenticateToken,
    updateRideController
);

// Delete Ride
router.delete(
    "/:id",
    authenticateToken,
    deleteRideController
);

module.exports = router;