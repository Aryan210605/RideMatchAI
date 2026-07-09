import { useEffect, useState } from "react";
import { getDriverStatistics } from "../services/rideService";

function Dashboard() {

    const [stats, setStats] = useState({
        total_rides: 0,
        total_fare: 0,
        seats_left: 0
    });

    useEffect(() => {

        loadStatistics();

    }, []);

    const loadStatistics = async () => {

        try {

            const response = await getDriverStatistics();

            setStats(response.data.stats);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>🚗 Driver Dashboard</h1>

            <hr />

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: "30px",
                    flexWrap: "wrap"
                }}
            >

                <div
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "250px"
                    }}
                >
                    <h2>Total Rides</h2>
                    <h1>{stats.total_rides}</h1>
                </div>

                <div
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "250px"
                    }}
                >
                    <h2>Total Fare</h2>
                    <h1>₹{stats.total_fare}</h1>
                </div>

                <div
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "250px"
                    }}
                >
                    <h2>Seats Left</h2>
                    <h1>{stats.seats_left}</h1>
                </div>

            </div>

        </div>

    );

}

export default Dashboard;