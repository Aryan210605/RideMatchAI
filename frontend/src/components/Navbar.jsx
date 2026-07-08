import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const logout = () => {

        localStorage.removeItem("token");

        setIsLoggedIn(false);

        navigate("/login");

    };

    return (

        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                background: "#0d6efd",
                color: "white"
            }}
        >

            <h2>RideMatch AI</h2>

            {
                isLoggedIn &&

                <button
                    onClick={logout}
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>

            }

        </nav>

    );

}

export default Navbar;