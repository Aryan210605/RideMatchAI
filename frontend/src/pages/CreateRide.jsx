import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRide } from "../services/rideService";

function CreateRide() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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

        if (
            !formData.pickup_location ||
            !formData.destination ||
            !formData.ride_date ||
            !formData.ride_time ||
            !formData.available_seats ||
            !formData.fare
        ) {

            alert("Please fill all fields.");
            return;

        }

        try {

            setLoading(true);

            const response = await createRide({
                ...formData,
                available_seats: Number(formData.available_seats),
                fare: Number(formData.fare)
            });

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create ride"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "25px",
                border: "1px solid #ddd",
                borderRadius: "10px"
            }}
        >

            <h2>Create Ride</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="pickup_location"
                    placeholder="Pickup Location"
                    value={formData.pickup_location}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="date"
                    name="ride_date"
                    value={formData.ride_date}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="time"
                    name="ride_time"
                    value={formData.ride_time}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="number"
                    name="available_seats"
                    placeholder="Available Seats"
                    value={formData.available_seats}
                    onChange={handleChange}
                    required
                    min="1"
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="number"
                    name="fare"
                    placeholder="Fare"
                    value={formData.fare}
                    onChange={handleChange}
                    required
                    min="1"
                    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Creating..." : "Create Ride"}
                </button>

            </form>

        </div>

    );

}

export default CreateRide;