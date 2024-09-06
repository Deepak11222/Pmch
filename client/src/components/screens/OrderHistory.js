// src/components/FetchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
                fetchPurchases(token);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/customer/login', {
                email,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            fetchPurchases(token);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const fetchPurchases = async (token) => {
        try {
            const response = await axios.get('http://localhost:3000/purchases', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurchases(response.data.purchases);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching purchases');
        }
    };
    

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <h1>Login</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <h1>My Purchases</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <ul>
                        {purchases.map(purchase => (
                            <li key={purchase._id}>
                                <h2>Purchase ID: {purchase._id}</h2>
                                <p>Status: {purchase.status}</p>
                                <p>Total Amount: {purchase.totalAmount}</p>
                                <p>Purchase Date: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                                <h3>Lab Tests:</h3>
                                <ul>
                                    {purchase.labTests.map(test => (
                                        <li key={test._id}>
                                            <p>Test Name: {test.name}</p>
                                            <p>Price: {test.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FetchPage;