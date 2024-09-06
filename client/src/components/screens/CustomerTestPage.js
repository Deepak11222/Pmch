import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CustomerTestPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [testList, setTestList] = useState([]);
    const [cartTests, setCartTests] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [message, setMessage] = useState('');
    const [purchases, setPurchases] = useState([]);

    // Fetch lab tests
    const fetchLabTests = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/lab-tests');
            setTestList(response.data || []);
        } catch (error) {
            setError('Failed to fetch lab tests');
        }
    }, []);

    // Fetch cart tests
    const fetchCartTests = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in first to fetch cart tests.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:3000/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setCartTests(response.data.tests || []);
        } catch (error) {
            setError('Failed to fetch cart tests');
        }
    }, []);

    // Fetch purchases
    const fetchPurchases = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in first.');
            return;
        }

        if (!customerId) {
            setError('Unable to fetch purchases. No customer ID found.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/purchases/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (Array.isArray(response.data)) {
                setPurchases(response.data);
            } else {
                setError('Invalid data format received');
            }
        } catch (error) {
            setError('Failed to fetch purchases');
        }
    }, [customerId]);

    // Handle user login
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/customer/login', {
                email,
                password,
            });

            const { token, customerId } = response.data;

            if (!token || !customerId) {
                throw new Error('Missing token or customerId');
            }

            localStorage.setItem('token', token);
            setCustomerId(customerId);
            setLoggedIn(true);
            setSuccess('Logged in successfully!');
            setError('');

            fetchPurchases(); // Fetch purchases after login
        } catch (error) {
            setError('Login failed');
            setSuccess('');
        }
    };

    // Handle selecting a test
    const handleSelectTest = async (testId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in first.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/cart/add', { testIds: [testId] }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const selectedTest = testList.find(test => test._id === testId);
            if (selectedTest && !cartTests.some(test => test._id === testId)) {
                setCartTests(prevTests => [...prevTests, selectedTest]);
            }
            setSuccess('Test added to cart successfully!');
            setError('');
        } catch (error) {
            setError('Failed to add test to cart');
            setSuccess('');
        }
    };

    // Handle removing a test
    const handleRemoveTest = async (testId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in first.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/cart/remove', { testId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setCartTests(prevTests => prevTests.filter(test => test._id !== testId));
            setSuccess('Test removed from cart successfully!');
            setError('');
        } catch (error) {
            setError('Failed to remove test from cart');
            setSuccess('');
        }
    };

    // Handle purchase
    const handlePurchase = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in first.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/purchase', {
                customerId,
                labTests: cartTests.map(test => test._id),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setMessage(response.data.message);
            setSuccess('Purchase completed successfully!');
            setError('');
            setCartTests([]);
            fetchPurchases(); // Refresh purchases after purchase
        } catch (error) {
            setMessage('Failed to complete purchase');
            setError('Failed to complete purchase');
            setSuccess('');
        }
    };

    useEffect(() => {
        if (loggedIn) {
            fetchLabTests();
            fetchCartTests();
            fetchPurchases();
        }
    }, [loggedIn, fetchLabTests, fetchCartTests, fetchPurchases]);

    return (
        <div>
            <h1>Customer Test Booking</h1>

            {!loggedIn ? (
                <div>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <>
                    <div>
                        <h2>Book Lab Tests</h2>
                        {testList.length > 0 ? (
                            testList.map(test => (
                                <div key={test._id}>
                                    <input
                                        type="checkbox"
                                        checked={cartTests.some(cartTest => cartTest._id === test._id)}
                                        onChange={() => handleSelectTest(test._id)}
                                    />
                                    {test.name} - ${test.price}
                                </div>
                            ))
                        ) : (
                            <p>No lab tests available</p>
                        )}
                    </div>

                    <div>
                        <h2>Your Cart</h2>
                        {cartTests.length > 0 ? (
                            cartTests.map(test => (
                                <div key={test._id}>
                                    {test.name} - ${test.price}
                                    <button onClick={() => handleRemoveTest(test._id)}>Remove</button>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty</p>
                        )}
                        <button onClick={handlePurchase}>Purchase</button>
                    </div>

                    <div>
                        <h2>Your Purchase History</h2>
                        {purchases.length > 0 ? (
                            purchases.map((purchase) => (
                                <div key={purchase._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                                    <h3>Purchase ID: {purchase._id}</h3>
                                    <p>Date: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                                    <p>Total Amount: ${purchase.totalAmount.toFixed(2)}</p>
                                    <h4>Tests:</h4>
                                    <ul>
                                        {purchase.labTests.map((test, index) => (
                                            <li key={index}>{test.name} - ${test.price.toFixed(2)}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>No purchases made yet</p>
                        )}
                    </div>
                </>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {message && <p style={{ color: 'blue' }}>{message}</p>}
        </div>
    );
};

export default CustomerTestPage;
