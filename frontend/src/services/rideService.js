import API from "./api";

// ==========================
// Create Ride
// ==========================

export const createRide = (rideData) => {

    return API.post("/rides/create", rideData);

};

// ==========================
// Get All Rides
// ==========================

export const getAllRides = () => {

    return API.get("/rides");

};

// ==========================
// Get Ride By ID
// ==========================

export const getRideById = (id) => {

    return API.get(`/rides/${id}`);

};

// ==========================
// Search Rides
// ==========================

export const searchRides = (searchData) => {

    return API.get("/rides/search", {
        params: {
            pickup_location: searchData.pickup_location,
            destination: searchData.destination,
            ride_date: searchData.ride_date,
            seats: searchData.seats
        }
    });

};

// ==========================
// Update Ride
// ==========================

export const updateRide = (id, rideData) => {

    return API.put(`/rides/${id}`, rideData);

};

// ==========================
// Delete Ride
// ==========================

export const deleteRide = (id) => {

    return API.delete(`/rides/${id}`);

};