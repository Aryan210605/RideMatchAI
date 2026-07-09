const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    createUser,
    getUserById,
    getAllUsers,
    blockUser,
    unblockUser,
    deleteUser
} = require("../models/userModel");

// ======================================
// Register
// ======================================

const registerUser = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            role
        } = req.body;

        if (!full_name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Only allow rider or driver
        const userRole =
            role === "driver" ? "driver" : "rider";

        const user = await createUser(
            full_name,
            email,
            hashedPassword,
            userRole
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Login
// ======================================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }

        const user = await findUserByEmail(email);

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            success: true,
            message: "Login Successful",
            token

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Get Profile
// ======================================

const getProfileController = async (req, res) => {

    try {

        const user = await getUserById(req.user.id);

        res.status(200).json({

            success: true,
            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ======================================
// Admin Controllers
// ======================================

const getAllUsersController = async (req, res) => {

    try {

        const users = await getAllUsers();

        res.status(200).json({

            success: true,
            users

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

const blockUserController = async (req, res) => {

    try {

        const user = await blockUser(req.params.id);

        res.status(200).json({

            success: true,
            message: "User blocked successfully",
            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

const unblockUserController = async (req, res) => {

    try {

        const user = await unblockUser(req.params.id);

        res.status(200).json({

            success: true,
            message: "User unblocked successfully",
            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

const deleteUserController = async (req, res) => {

    try {

        const user = await deleteUser(req.params.id);

        res.status(200).json({

            success: true,
            message: "User deleted successfully",
            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

module.exports = {

    registerUser,
    loginUser,
    getProfileController,
    getAllUsersController,
    blockUserController,
    unblockUserController,
    deleteUserController

};