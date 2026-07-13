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
import MyRides from "./pages/MyRides";
import EditRide from "./pages/EditRide";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <SearchRide />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-ride"
                    element={
                        <ProtectedRoute>
                            <CreateRide />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payments"
                    element={
                        <ProtectedRoute>
                            <MyPayments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-rides"
                    element={
                        <ProtectedRoute>
                            <MyRides />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-ride/:id"
                    element={
                        <ProtectedRoute>
                            <CreateRide />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;