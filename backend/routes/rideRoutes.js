const express = require("express");
const router = express.Router();

const {
    createRideController,
    getAllRidesController,
    getRideByIdController,
    searchRidesController,
    updateRideController,
    deleteRideController,
    getMyRidesController
} = require("../controllers/rideController");

const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// =====================================
// Create Ride (Driver Only)
// =====================================

router.post(
    "/create",
    authenticateToken,
    authorizeRole("driver"),
    createRideController
);

// =====================================
// Get All Rides
// =====================================

router.get(
    "/",
    authenticateToken,
    getAllRidesController
);

// =====================================
// Search Rides
// =====================================

router.get(
    "/search",
    authenticateToken,
    searchRidesController
);

// =====================================
// Driver Dashboard Statistics
// =====================================

// router.get(
//     "/driver/stats",
//     authenticateToken,
//     authorizeRole("driver"),
//     getDriverStatisticsController
// );

router.get(
    "/my",
    authenticateToken,
    getMyRidesController
);

// =====================================
// Get Ride By ID
// =====================================

router.get(
    "/:id",
    authenticateToken,
    getRideByIdController
);



// =====================================
// Update Ride (Driver Only)
// =====================================

router.put(
    "/:id",
    authenticateToken,
    authorizeRole("driver"),
    updateRideController
);

// =====================================
// Delete Ride (Driver Only)
// =====================================

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("driver"),
    deleteRideController
);

module.exports = router;