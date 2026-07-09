import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        full_name: "",
        email: "",
        password: "",
        role: "rider"

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

            const response = await registerUser(formData);

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h2>Register</h2>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Enter Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="role-select"
                >
                    <option value="rider">🚗 Rider</option>
                    <option value="driver">🚕 Driver</option>
                </select>

                

                <button type="submit">

                    Register

                </button>

            </form>

        </div>

    );

}

export default Register;