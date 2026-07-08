import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setIsLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser({
                email,
                password
            });
            console.log("LOGIN RESPONSE");
            console.log(response);
            console.log(response.data);
            console.log(response.data.token);

            // Save JWT Token
            localStorage.setItem(
                "token",
                response.data.token
            );
            console.log("Saved token:", localStorage.getItem("token"));

            // Update Auth Context
            setIsLoggedIn(true);

            alert("Login Successful");

            // Go to Dashboard
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;