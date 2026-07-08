import API from "./api";

// ==========================
// Create Ride
// ==========================

export const createRide = (rideData) => {

    return API.post(
        "/rides/create",
        rideData
    );

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

export const searchRides = (
    pickup_location,
    destination,
    ride_date,
    seats
) => {

    return API.get(
        `/rides/search?pickup_location=${pickup_location}&destination=${destination}&ride_date=${ride_date}&seats=${seats}`
    );

};

// ==========================
// Update Ride
// ==========================

export const updateRide = (
    id,
    rideData
) => {

    return API.put(
        `/rides/${id}`,
        rideData
    );

};

// ==========================
// Delete Ride
// ==========================

export const deleteRide = (id) => {

    return API.delete(`/rides/${id}`);

};