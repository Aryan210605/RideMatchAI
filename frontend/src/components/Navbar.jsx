import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {

    const { isLoggedIn, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="navbar">

            <div className="logo">

                <h2>🚗 RideMatch AI</h2>

            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                {

                    isLoggedIn ? (

                        <>

                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                            <Link to="/search">
                                Search Ride
                            </Link>

                            <Link to="/create-ride">
                                Create Ride
                            </Link>

                            <Link to="/bookings">
                                My Bookings
                            </Link>

                            <Link to="/payments">
                                Payments
                            </Link>

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>

                        </>

                    )

                }

            </div>

        </nav>

    );

}

export default Navbar;