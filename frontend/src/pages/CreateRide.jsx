import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRide } from "../services/rideService";

function CreateRide() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        pickup_location: "",
        destination: "",
        ride_date: "",
        ride_time: "",
        available_seats: "",
        fare: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await createRide(formData);

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create ride"
            );

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Create Ride</h1>

            <form onSubmit={handleSubmit}>

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
                    type="time"
                    name="ride_time"
                    value={formData.ride_time}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="available_seats"
                    placeholder="Available Seats"
                    value={formData.available_seats}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="fare"
                    placeholder="Fare"
                    value={formData.fare}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">

                    Create Ride

                </button>

            </form>

        </div>

    );

}

export default CreateRide;