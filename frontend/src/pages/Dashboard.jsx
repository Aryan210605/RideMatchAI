import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                console.log("Token =", localStorage.getItem("token"));

                const response = await API.get("/auth/profile");

                console.log("PROFILE RESPONSE");
                console.log(response.data);

                setUser(response.data.user);

            } catch (error) {

                console.log("FULL ERROR");
                console.log(error);

                if (error.response) {
                    console.log(error.response.data);
                }

            }

        };

        fetchProfile();

    }, []);

    return (

        <div style={{ padding: "30px" }}>

            <h1>Dashboard</h1>

            {user ? (

                <>
                    <h2>Welcome, {user.full_name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </>

            ) : (

                <p>Loading...</p>

            )}

        </div>

    );

}

export default Dashboard;