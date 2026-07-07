const {
    getDriverDashboard,
    getRiderDashboard,
    getAdminDashboard,
    getMonthlyAnalytics
} = require("../models/dashboardModel");

const getDriverDashboardController = async (req, res) => {

    try {

        const driver_id = req.user.id;

        const dashboard = await getDriverDashboard(driver_id);

        res.status(200).json({
            success: true,
            dashboard
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getRiderDashboardController = async (req, res) => {

    try {

        const user_id = req.user.id;

        const dashboard = await getRiderDashboard(user_id);

        res.status(200).json({
            success: true,
            dashboard
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getAdminDashboardController = async (req, res) => {

    try {

        const dashboard = await getAdminDashboard();

        res.status(200).json({
            success: true,
            dashboard
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getMonthlyAnalyticsController = async (req, res) => {

    try {

        const analytics = await getMonthlyAnalytics();

        res.status(200).json({
            success: true,
            analytics
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
    getDriverDashboardController,
    getRiderDashboardController,
    getAdminDashboardController,
    getMonthlyAnalyticsController
};