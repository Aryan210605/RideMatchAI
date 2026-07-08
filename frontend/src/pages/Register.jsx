import { useState } from "react";
import "../styles/Auth.css";
import { registerUser } from "../services/authService";

function Register() {

    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await registerUser({
            full_name,
            email,
            password
        });

        alert(response.data.message);

        setFullName("");
        setEmail("");
        setPassword("");

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Registration Failed"
        );

    }

    };

    return (

        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;