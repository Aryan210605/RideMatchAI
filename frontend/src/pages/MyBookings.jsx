function MyBookings() {

    return (

        <div style={{ padding: "30px" }}>

            <h1>📖 My Bookings</h1>

            <hr />

            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "20px"
                }}
            >

                <h3>No bookings available.</h3>

                <p>
                    You haven't booked any rides yet.
                </p>

            </div>

        </div>

    );

}

export default MyBookings;