const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfileController,
    getAllUsersController,
    blockUserController,
    unblockUserController,
    deleteUserController
} = require("../controllers/authController");

const { authenticateToken } = require("../middleware/authMiddleware");

// Use the correct middleware filename
const authorizeRole = require("../middleware/roleMiddleware");
// If your file is actually named roleMiddleware.js, then keep:
// const authorizeRole = require("../middleware/roleMiddleware");

// =========================
// Public Routes
// =========================

router.post("/register", registerUser);

router.post("/login", loginUser);

// =========================
// User Routes
// =========================

router.get(
    "/profile",
    authenticateToken,
    getProfileController
);

// =========================
// Admin Routes
// =========================

// Get all users
router.get(
    "/admin/users",
    authenticateToken,
    authorizeRole("admin"),
    getAllUsersController
);

// Block a user
router.put(
    "/admin/block/:id",
    authenticateToken,
    authorizeRole("admin"),
    blockUserController
);

// Unblock a user
router.put(
    "/admin/unblock/:id",
    authenticateToken,
    authorizeRole("admin"),
    unblockUserController
);

// Delete a user
router.delete(
    "/admin/delete/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteUserController
);

module.exports = router;