import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryBoyDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Assume the token and orders are stored in local storage after login
        const token = localStorage.getItem('token');
        const fetchedOrders = JSON.parse(localStorage.getItem('orders'));

        if (token && fetchedOrders) {
            setOrders(fetchedOrders);
        }
    }, []);

    // Render the orders on the page
    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            Order ID: {order._id} - Status: {order.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders assigned</p>
            )}
        </div>
    );
};

export default DeliveryBoyDashboard;