import { useEffect, useState } from "react";
import { getMyPayments } from "../services/paymentService";

function MyPayments() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

    try {

        const response = await getMyPayments();

        console.log(response.data);

        console.log(response.data.payments);

        setPayments(response.data.payments);

    } catch (error) {

        console.log(error);

    }

};

    return (

        <div style={{ padding: "30px" }}>

            <h1>💳 My Payments</h1>

            <hr />

            {

                payments.length === 0 ?

                    (

                        <h3>No Payments Found</h3>

                    )

                    :

                    payments.map((payment) => (

                        <div
    key={payment.id}
    style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
    }}
>

    <h3>💳 Payment #{payment.id}</h3>

    <p><strong>Booking ID:</strong> {payment.booking_id}</p>

    <p><strong>Ride ID:</strong> {payment.ride_id}</p>

    <p><strong>Seats Booked:</strong> {payment.seats_booked}</p>

    <p><strong>Amount:</strong> ₹{payment.amount}</p>

    <p><strong>Currency:</strong> {payment.currency}</p>

    <p><strong>Status:</strong> {payment.payment_status}</p>

    <p><strong>Method:</strong> {payment.payment_method}</p>

    <p>
        <strong>Payment Date:</strong>{" "}
        {new Date(payment.created_at).toLocaleString()}
    </p>

</div>

                    ))

            }

        </div>

    );

}

export default MyPayments;