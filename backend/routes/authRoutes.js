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
const authorizeRole = require("../middleware/roleMiddleware");

// ===========================
// Public Routes
// ===========================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// ===========================
// User Routes
// ===========================

// Logged-in User Profile
router.get(
    "/profile",
    authenticateToken,
    getProfileController
);

// ===========================
// Admin Routes
// ===========================

// Get all users
router.get(
    "/admin/users",
    authenticateToken,
    authorizeRole("admin"),
    getAllUsersController
);

// Block user
router.put(
    "/admin/block/:id",
    authenticateToken,
    authorizeRole("admin"),
    blockUserController
);

// Unblock user
router.put(
    "/admin/unblock/:id",
    authenticateToken,
    authorizeRole("admin"),
    unblockUserController
);

// Delete user
router.delete(
    "/admin/delete/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteUserController
);

module.exports = router;