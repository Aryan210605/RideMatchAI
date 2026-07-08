import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await API.get("/auth/profile");

                setUser(response.data.user);

            } catch (error) {

                console.log(error);

            }

        };

        fetchProfile();

    }, []);

    return (

        <div className="dashboard-container">

            <h1>Dashboard</h1>

            {
                user ? (

                    <>

                        <div className="profile-card">

                            <h2>Welcome, {user.full_name}</h2>

                            <p>
                                <strong>Email :</strong> {user.email}
                            </p>

                            <p>
                                <strong>Role :</strong> {user.role}
                            </p>

                        </div>

                        <div className="action-grid">

                            <Link
                                to="/create-ride"
                                className="action-card"
                            >
                                <h3>🚗 Create Ride</h3>
                                <p>Create a new ride for passengers.</p>
                            </Link>

                            <Link
                                to="/search"
                                className="action-card"
                            >
                                <h3>🔍 Search Ride</h3>
                                <p>Find rides matching your route.</p>
                            </Link>

                            <Link
                                to="/bookings"
                                className="action-card"
                            >
                                <h3>📖 My Bookings</h3>
                                <p>View all your ride bookings.</p>
                            </Link>

                            <Link
                                to="/payments"
                                className="action-card"
                            >
                                <h3>💳 Payments</h3>
                                <p>Check your payment history.</p>
                            </Link>

                        </div>

                    </>

                ) : (

                    <h2>Loading...</h2>

                )
            }

        </div>

    );

}

export default Dashboard;