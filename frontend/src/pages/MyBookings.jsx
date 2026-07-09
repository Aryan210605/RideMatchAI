import { useEffect, useState } from "react";
import {
    getMyBookings,
    cancelBooking
} from "../services/bookingService";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const loadBookings = async () => {

        try {

            const response = await getMyBookings();

            setBookings(response.data.bookings);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadBookings();

    }, []);

    const handleCancel = async (id) => {

        try {

            const response = await cancelBooking(id);

            alert(response.data.message);

            loadBookings();

        } catch (error) {

            alert(

                error.response?.data?.message ||
                "Failed to cancel booking"

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

                    <h3>No bookings available.</h3>

                )

                :

                bookings.map((booking) => (

                    <div

                        key={booking.id}

                        style={{

                            border:"1px solid #ddd",

                            padding:"20px",

                            marginBottom:"20px",

                            borderRadius:"10px"

                        }}

                    >

                        <h3>

                            {booking.pickup_location}

                            {" → "}

                            {booking.destination}

                        </h3>

                        <p>

                            Date :

                            {" "}

                            {booking.ride_date}

                        </p>

                        <p>

                            Time :

                            {" "}

                            {booking.ride_time}

                        </p>

                        <p>

                            Seats :

                            {" "}

                            {booking.seats_booked}

                        </p>

                        <p>

                            Fare :

                            ₹{booking.fare}

                        </p>

                        <p>

                            Status :

                            {booking.booking_status}

                        </p>

                        {

                            booking.booking_status === "Booked"

                            &&

                            <button

                                onClick={()=>

                                    handleCancel(booking.id)

                                }

                            >

                                Cancel Booking

                            </button>

                        }

                    </div>

                ))

            }

        </div>

    );

}

export default MyBookings;