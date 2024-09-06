import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeliveryBoyLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:8081/delivery-boys/login', { email, password });
            const { token, orders } = res.data;

            // Save the token in localStorage or context
            localStorage.setItem('token', token);

            // Update the state with the fetched orders
            setOrders(orders);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Delivery Boy Login</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p className="text-danger">{error}</p>}

            {/* Render orders in a Bootstrap table */}
            {orders.length > 0 && (
                <div>
                    <h3>Your Orders</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Grand Total</th>
                                <th>Billing Name</th>
                                <th>Shipping Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.orderId}</td>
                                    <td>{order.status}</td>
                                    <td>${order.grandTotal.toFixed(2)}</td>
                                    <td>{order.billToName}</td>
                                    <td>
                                        {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.state}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DeliveryBoyLogin;