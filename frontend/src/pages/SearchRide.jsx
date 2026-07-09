import { useState } from "react";
import { searchRides } from "../services/rideService";
import { bookRide } from "../services/bookingService";

function SearchRide() {

    const [search, setSearch] = useState({

        pickup_location: "",
        destination: "",
        ride_date: "",
        seats: 1

    });

    const [rides, setRides] = useState([]);

    const handleChange = (e) => {

        setSearch({

            ...search,
            [e.target.name]: e.target.value

        });

    };

    const handleSearch = async (e) => {

        e.preventDefault();

        try {

            const response = await searchRides(

                search.pickup_location,
                search.destination,
                search.ride_date,
                search.seats

            );

            setRides(response.data.rides);

        } catch (error) {

            alert(

                error.response?.data?.message ||
                "No rides found"

            );

        }

    };

    const handleBookRide = async (rideId) => {

        const seats = prompt("Enter number of seats:");

        if (!seats) return;

        try {

            const response = await bookRide(

                rideId,
                Number(seats)

            );

            alert(response.data.message);

            // Refresh search result

            const updated = await searchRides(

                search.pickup_location,
                search.destination,
                search.ride_date,
                search.seats

            );

            setRides(updated.data.rides);

        } catch (error) {

            alert(

                error.response?.data?.message ||
                "Booking failed"

            );

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Search Ride</h1>

            <form onSubmit={handleSearch}>

                <input
                    type="text"
                    name="pickup_location"
                    placeholder="Pickup"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="date"
                    name="ride_date"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="seats"
                    value={search.seats}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    Search

                </button>

            </form>

            <hr />

            {

                rides.map((ride) => (

                    <div
                        key={ride.id}
                        style={{
                            border: "1px solid gray",
                            marginBottom: "15px",
                            padding: "15px"
                        }}
                    >

                        <h3>

                            {ride.pickup_location}
                            {" → "}
                            {ride.destination}

                        </h3>

                        <p>

                            Date :
                            {" "}
                            {ride.ride_date}

                        </p>

                        <p>

                            Time :
                            {" "}
                            {ride.ride_time}

                        </p>

                        <p>

                            Seats :
                            {" "}
                            {ride.available_seats}

                        </p>

                        <p>

                            Fare :
                            ₹{ride.fare}

                        </p>

                        <button
                            onClick={() =>
                                handleBookRide(ride.id)
                            }
                        >

                            Book Ride

                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default SearchRide;