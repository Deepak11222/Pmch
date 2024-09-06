// src/pages/DeliveryBoyRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const DeliveryBoyRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    aadharNumber: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/adddelivery', formData);
      setMessage('Registration successful!');
    } catch (err) {
      setMessage('Registration failed!');
    }
  };

  return (
    <div>
      <h2>Register as a Delivery Boy</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <div>
          <label>Aadhar Number</label>
          <input type="text" name="aadharNumber" onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeliveryBoyRegister;