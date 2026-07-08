import { useState } from "react";
import { searchRides } from "../services/rideService";

function SearchRide() {

    const [formData, setFormData] = useState({
        pickup_location: "",
        destination: "",
        ride_date: "",
        seats: 1
    });

    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSearch = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await searchRides(formData);

            setRides(response.data.rides || []);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to search rides"
            );

            setRides([]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Search Ride</h1>

            <form onSubmit={handleSearch}>

                <input
                    type="text"
                    name="pickup_location"
                    placeholder="Pickup Location"
                    value={formData.pickup_location}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="ride_date"
                    value={formData.ride_date}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="seats"
                    min="1"
                    value={formData.seats}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">

                    {loading ? "Searching..." : "Search Ride"}

                </button>

            </form>

            <hr />

            {

                rides.length === 0 ? (

                    <p>No rides found.</p>

                ) : (

                    rides.map((ride) => (

                        <div
                            key={ride.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "15px",
                                marginBottom: "15px",
                                borderRadius: "8px"
                            }}
                        >

                            <h3>
                                {ride.pickup_location} → {ride.destination}
                            </h3>

                            <p>Date: {ride.ride_date}</p>

                            <p>Time: {ride.ride_time}</p>

                            <p>Seats: {ride.available_seats}</p>

                            <p>Fare: ₹{ride.fare}</p>

                            <button>

                                Book Ride

                            </button>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default SearchRide;