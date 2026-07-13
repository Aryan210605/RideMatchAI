import API from "./api";

// ==========================
// Create Payment
// ==========================

export const createPayment = (booking_id) => {

    return API.post("/payments/pay", {
        booking_id
    });

};

// ==========================
// Get My Payments
// ==========================

export const getMyPayments = () => {

    return API.get("/payments/my");

};