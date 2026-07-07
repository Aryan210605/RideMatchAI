import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <h2>🚗 RideMatch AI</h2>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/search">Search Ride</Link>

                <Link to="/create-ride">Create Ride</Link>

                <Link to="/bookings">My Bookings</Link>

                <Link to="/payments">Payments</Link>

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>

            </div>

        </nav>
    );
}

export default Navbar;