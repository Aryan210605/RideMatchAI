const express = require("express");
const router = express.Router();

const {
    createPaymentController,
    getMyPaymentsController
} = require("../controllers/paymentController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

// ==========================
// Create Payment
// ==========================

router.post(
    "/pay",
    authenticateToken,
    createPaymentController
);

// ==========================
// My Payments
// ==========================

router.get(
    "/my",
    authenticateToken,
    getMyPaymentsController
);

module.exports = router;