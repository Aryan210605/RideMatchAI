require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const authorizeRole = require("./middleware/roleMiddleware");
const rideRoutes = require("./routes/rideRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.send("THIS IS MY NEW SERVER");
});

// Protected Route
app.get("/api/profile", verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route accessed successfully",
        user: req.user
    });
});

// Rider Dashboard (Only Rider Can Access)
app.get(
    "/api/rider-dashboard",
    verifyToken,
    authorizeRole("rider"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Rider",
            user: req.user
        });
    }
);

app.get(
    "/api/driver-dashboard",
    verifyToken,
    authorizeRole("driver"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Driver",
            user: req.user
        });
    }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});