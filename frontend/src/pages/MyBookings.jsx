import { useEffect, useState } from "react";

import {
    getMyBookings,
    cancelBooking
} from "../services/bookingService";

import {
    createPayment
} from "../services/paymentService";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const response = await getMyBookings();

            setBookings(response.data.bookings);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to load bookings"
            );

        }

    };

    const handleCancel = async (id) => {

        try {

            const response = await cancelBooking(id);

            alert(response.data.message);

            loadBookings();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Cancel Failed"
            );

        }

    };

    const handlePayment = async (bookingId) => {

        try {

            const response = await createPayment(bookingId);

            alert(response.data.message);

            loadBookings();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Payment Failed"
            );

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>📖 My Bookings</h1>

            <hr />

            {

                bookings.length === 0 ?

                    (

                        <h3>No Bookings Found</h3>

                    )

                    :

                    bookings.map((booking) => (

                        <div

                            key={booking.id}

                            style={{

                                border: "1px solid #ddd",

                                borderRadius: "10px",

                                padding: "20px",

                                marginBottom: "20px"

                            }}

                        >

                            <h3>
                                Booking #{booking.id}
                            </h3>

                            <p>
                                Ride ID : {booking.ride_id}
                            </p>

                            <p>
                                Seats Booked : {booking.seats_booked}
                            </p>

                            <p>
                                Status : {booking.booking_status}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "15px"
                                }}
                            >

                                {

                                    booking.booking_status === "Booked" && (

                                        <button

                                            onClick={() =>
                                                handleCancel(booking.id)
                                            }

                                            style={{

                                                padding: "10px 20px",

                                                background: "#dc3545",

                                                color: "white",

                                                border: "none",

                                                borderRadius: "5px",

                                                cursor: "pointer"

                                            }}

                                        >

                                            ❌ Cancel Booking

                                        </button>

                                    )

                                }

                                {

                                    booking.booking_status === "Booked" && (

                                        <button

                                            onClick={() =>
                                                handlePayment(booking.id)
                                            }

                                            style={{

                                                padding: "10px 20px",

                                                background: "#0d6efd",

                                                color: "white",

                                                border: "none",

                                                borderRadius: "5px",

                                                cursor: "pointer"

                                            }}

                                        >

                                            💳 Pay Now

                                        </button>

                                    )

                                }

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default MyBookings;