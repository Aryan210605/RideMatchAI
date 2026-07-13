import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getMyRides,
    deleteRide
} from "../services/rideService";

function MyRides() {

    const navigate = useNavigate();

    const [rides, setRides] = useState([]);

    useEffect(() => {
        loadMyRides();
    }, []);

    const loadMyRides = async () => {

        try {

            const response = await getMyRides();

            setRides(response.data.rides);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to load rides"
            );

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ride?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await deleteRide(id);

            alert(response.data.message);

            loadMyRides();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    return (

        <div
            style={{
                padding: "40px",
                background: "#f4f6f9",
                minHeight: "100vh"
            }}
        >

            <h1
                style={{
                    color: "#0d6efd",
                    marginBottom: "20px",
                    fontWeight: "bold"
                }}
            >
                🚗 My Rides
            </h1>

            <hr />

            {

                rides.length === 0 ?

                    (

                        <div
                            style={{
                                background: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                textAlign: "center",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                                marginTop: "30px"
                            }}
                        >

                            <h2>No rides created yet.</h2>

                            <p>Create your first ride to see it here.</p>

                        </div>

                    )

                    :

                    rides.map((ride) => (

                        <div
                            key={ride.id}
                            style={{
                                background: "#ffffff",
                                borderRadius: "15px",
                                padding: "25px",
                                marginBottom: "25px",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                                borderLeft: "6px solid #0d6efd"
                            }}
                        >

                            <h2
                                style={{
                                    marginBottom: "15px",
                                    color: "#0d6efd"
                                }}
                            >
                                🚗 Ride #{ride.id}
                            </h2>

                            <p>
                                <strong>📍 Pickup:</strong>{" "}
                                {ride.pickup_location}
                            </p>

                            <p>
                                <strong>🏁 Destination:</strong>{" "}
                                {ride.destination}
                            </p>

                            <p>
                                <strong>📅 Date:</strong>{" "}
                                {ride.ride_date}
                            </p>

                            <p>
                                <strong>⏰ Time:</strong>{" "}
                                {ride.ride_time}
                            </p>

                            <p>
                                <strong>💺 Available Seats:</strong>{" "}
                                {ride.available_seats}
                            </p>

                            <p>
                                <strong
                                    style={{
                                        color: "green"
                                    }}
                                >
                                    💰 Fare:
                                </strong>{" "}
                                ₹{ride.fare}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "15px",
                                    marginTop: "20px"
                                }}
                            >

                                <button
                                    onClick={() =>
                                        navigate(`/edit-ride/${ride.id}`)
                                    }
                                    style={{
                                        padding: "10px 22px",
                                        background: "#ffc107",
                                        color: "#000",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    ✏️ Edit Ride
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(ride.id)
                                    }
                                    style={{
                                        padding: "10px 22px",
                                        background: "#dc3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    🗑 Delete Ride
                                </button>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default MyRides;