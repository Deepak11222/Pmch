import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryBoyManagement = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const response = await axios.get('/api/deliveryBoys');
      if (Array.isArray(response.data)) {
        setDeliveryBoys(response.data);
      } else {
        console.error('API did not return an array', response.data);
        setDeliveryBoys([]);
      }
    } catch (error) {
      console.error('Failed to fetch delivery boys', error);
      setDeliveryBoys([]);
    }
  };

  const addDeliveryBoy = async () => {
    try {
      const response = await axios.post('/adddelivery', { name, phone });
      setDeliveryBoys([...deliveryBoys, response.data]);
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Failed to add delivery boy', error);
    }
  };

  return (
    <div>
      <h3>Manage Delivery Boys</h3>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={addDeliveryBoy}>Add Delivery Boy</button>
      </div>
      <ul>
        {deliveryBoys.map((boy) => (
          <li key={boy._id}>{boy.name} - {boy.phone} ({boy.status})</li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryBoyManagement;