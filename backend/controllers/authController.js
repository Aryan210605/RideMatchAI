const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    createUser,
    getAllUsers,
    blockUser,
    unblockUser,
    deleteUser
} = require("../models/userModel");

// ==========================
// Register User
// ==========================
const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        // Check required fields
        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if email already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = await createUser(
            full_name,
            email,
            hashedPassword,
            role || "rider"
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// ==========================
// Login User
// ==========================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Find user by email
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate JWT Token
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

        // Success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getProfileController = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getAllUsersController = async (req,res)=>{

    try{

        const users=await getAllUsers();

        res.status(200).json({
            success:true,
            total:users.length,
            users
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });

    }

};

const blockUserController=async(req,res)=>{

    try{

        const user=await blockUser(req.params.id);

        if(!user){

            return res.status(404).json({

                success:false,
                message:"User not found"

            });

        }

        res.status(200).json({

            success:true,
            message:"User blocked successfully",
            user

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,
            message:"Internal Server Error"

        });

    }

};

const unblockUserController=async(req,res)=>{

    try{

        const user=await unblockUser(req.params.id);

        if(!user){

            return res.status(404).json({

                success:false,
                message:"User not found"

            });

        }

        res.status(200).json({

            success:true,
            message:"User unblocked successfully",
            user

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,
            message:"Internal Server Error"

        });

    }

};

const deleteUserController=async(req,res)=>{

    try{

        const user=await deleteUser(req.params.id);

        if(!user){

            return res.status(404).json({

                success:false,
                message:"User not found"

            });

        }

        res.status(200).json({

            success:true,
            message:"User deleted successfully"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,
            message:"Internal Server Error"

        });

    }

};

// ==========================
// Export Functions
// ==========================
module.exports = {
    registerUser,
    loginUser,
    getProfileController,
    getAllUsersController,
    blockUserController,
    unblockUserController,
    deleteUserController
};