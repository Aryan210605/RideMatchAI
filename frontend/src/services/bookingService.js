import API from "./api";

// Book Ride
export const bookRide = (ride_id, seats_booked) => {

    return API.post("/bookings/book", {
        ride_id,
        seats_booked
    });

};

// My Bookings
export const getMyBookings = () => {

    return API.get("/bookings/my-bookings");

};

// Cancel Booking
export const cancelBooking = (id) => {

    return API.put(`/bookings/cancel/${id}`);

};