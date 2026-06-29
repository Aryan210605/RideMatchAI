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

router.post("/create", createRideController);

router.get("/", getAllRidesController);

router.get("/search", searchRidesController);

router.get("/:id", getRideByIdController);

router.put("/:id", updateRideController);

router.delete("/:id", deleteRideController);

module.exports = router;