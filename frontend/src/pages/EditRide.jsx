import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRideById, updateRide } from "../services/rideService";

function EditRide() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({

        pickup_location: "",
        destination: "",
        ride_date: "",
        ride_time: "",
        available_seats: "",
        fare: ""

    });

    useEffect(() => {

        loadRide();

    }, []);

    const loadRide = async () => {

        try {

            const response = await getRideById(id);

            setFormData(response.data.ride);

        } catch (error) {

            console.log(error);

            alert("Failed to load ride");

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await updateRide(id, formData);

            alert(response.data.message);

            navigate("/my-rides");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>✏️ Edit Ride</h1>

            <hr />

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="pickup_location"
                    placeholder="Pickup Location"
                    value={formData.pickup_location}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="date"
                    name="ride_date"
                    value={formData.ride_date}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="time"
                    name="ride_time"
                    value={formData.ride_time}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="available_seats"
                    placeholder="Available Seats"
                    value={formData.available_seats}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="fare"
                    placeholder="Fare"
                    value={formData.fare}
                    onChange={handleChange}
                />

                <br /><br />

                <button
                    type="submit"
                    style={{
                        padding: "10px 25px",
                        background: "#198754",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    ✅ Update Ride
                </button>

            </form>

        </div>

    );

}

export default EditRide;