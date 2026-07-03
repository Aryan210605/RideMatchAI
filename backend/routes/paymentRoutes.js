const express = require("express");
const router = express.Router();

const {
    createOrderController,
    verifyPaymentController,
    getPaymentHistoryController,
    getUserPaymentsController
} = require("../controllers/paymentController");

const { authenticateToken } = require("../middleware/authMiddleware");

router.post(
    "/create-order",
    authenticateToken,
    createOrderController
);

router.post(
    "/verify",
    authenticateToken,
    verifyPaymentController
);

router.get(
    "/history/:booking_id",
    authenticateToken,
    getPaymentHistoryController
);

router.get(
    "/my-payments",
    authenticateToken,
    getUserPaymentsController
);

module.exports = router;