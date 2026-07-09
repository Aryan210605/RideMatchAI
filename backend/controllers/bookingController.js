const {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking
} = require("../models/bookingModel");

const {
    getRideById,
    reduceAvailableSeats,
    updateRide
} = require("../models/rideModel");

// ==============================
// Book Ride
// ==============================

const createBookingController = async (req, res) => {

    try {

        const { ride_id, seats_booked } = req.body;

        const passenger_id = req.user.id;

        if (!ride_id || !seats_booked) {

            return res.status(400).json({
                success: false,
                message: "Ride ID and seats are required"
            });

        }

        const ride = await getRideById(ride_id);

        if (!ride) {

            return res.status(404).json({
                success: false,
                message: "Ride not found"
            });

        }

        if (ride.available_seats < seats_booked) {

            return res.status(400).json({
                success: false,
                message: "Not enough seats available"
            });

        }

        await reduceAvailableSeats(
            ride_id,
            seats_booked
        );

        const booking = await createBooking(
            ride_id,
            passenger_id,
            seats_booked
        );

        res.status(201).json({

            success: true,
            message: "Ride booked successfully",
            booking

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ==============================
// My Bookings
// ==============================

const getMyBookingsController = async (req, res) => {

    try {

        const bookings = await getMyBookings(
            req.user.id
        );

        res.status(200).json({

            success: true,
            total: bookings.length,
            bookings

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

// ==============================
// Cancel Booking
// ==============================

const cancelBookingController = async (req, res) => {

    try {

        const { id } = req.params;

        const booking = await getBookingById(id);

        if (!booking) {

            return res.status(404).json({

                success: false,
                message: "Booking not found"

            });

        }

        if (booking.booking_status === "Cancelled") {

            return res.status(400).json({

                success: false,
                message: "Booking already cancelled"

            });

        }

        const ride = await getRideById(
            booking.ride_id
        );

        await updateRide(

            ride.id,

            ride.pickup_location,
            ride.destination,
            ride.ride_date,
            ride.ride_time,

            ride.available_seats +
                booking.seats_booked,

            ride.fare

        );

        const cancelled = await cancelBooking(id);

        res.status(200).json({

            success: true,
            message: "Booking cancelled successfully",
            booking: cancelled

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

    createBookingController,
    getMyBookingsController,
    cancelBookingController

};