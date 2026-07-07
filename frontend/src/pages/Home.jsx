import { useEffect } from "react";
import API from "../services/api";

function Home() {

    useEffect(() => {

        const testConnection = async () => {

            try {

                const response = await API.get("/test");

                console.log(response.data);

            } catch (error) {

                console.log(error.response?.data || error.message);

            }

        };

        testConnection();

    }, []);

    return (
        <div>
            <h1>🏠 Home Page</h1>
        </div>
    );
}

export default Home;