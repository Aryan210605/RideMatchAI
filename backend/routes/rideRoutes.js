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

const authorizeRole = require("../middleware/roleMiddleware");

router.post(
    "/create",
    authenticateToken,
    authorizeRole("driver"),
    createRideController
);

router.get("/", authenticateToken, getAllRidesController);

router.get("/search", searchRidesController);

router.get("/:id", authenticateToken, getRideByIdController);

router.put(
    "/:id",
    authenticateToken,
    authorizeRole("driver"),
    updateRideController
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("driver"),
    deleteRideController
);

module.exports = router;