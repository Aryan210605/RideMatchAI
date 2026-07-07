import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchRide from "./pages/SearchRide";
import CreateRide from "./pages/CreateRide";
import MyBookings from "./pages/MyBookings";
import MyPayments from "./pages/MyPayments";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/search" element={<SearchRide />} />

                <Route path="/create-ride" element={<CreateRide />} />

                <Route path="/bookings" element={<MyBookings />} />

                <Route path="/payments" element={<MyPayments />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;