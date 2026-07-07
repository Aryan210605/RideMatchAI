const express = require("express");

const router = express.Router();

const {
    getDriverDashboardController,
    getRiderDashboardController,
    getAdminDashboardController,
    getMonthlyAnalyticsController
} = require("../controllers/dashboardController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

router.get(
    "/driver",
    authenticateToken,
    getDriverDashboardController
);

router.get(
    "/rider",
    authenticateToken,
    getRiderDashboardController
);

router.get(
    "/admin",
    authenticateToken,
    authorizeRole("admin"),
    getAdminDashboardController
);

router.get(
    "/analytics",
    authenticateToken,
    authorizeRole("admin"),
    getMonthlyAnalyticsController
);
module.exports = router;