// src/components/AssignDeliveryBoy.js

import React, { useState } from 'react';
import axios from 'axios';

const AssignDeliveryBoy = ({ orderId }) => {
  const [deliveryBoyId, setDeliveryBoyId] = useState('');

  const assignDeliveryBoy = async (orderId, deliveryBoyId) => {
    try {
      const response = await axios.put(`/api/orders/assign/${orderId}`, {
        deliveryBoyId
      });
      console.log('Delivery boy assigned successfully:', response.data);
    } catch (error) {
      console.error('Failed to assign delivery boy:', error.response?.data || error.message);
    }
  };

  const handleAssignClick = () => {
    assignDeliveryBoy(orderId, deliveryBoyId);
  };

  return (
    <div>
      <input
        type="text"
        value={deliveryBoyId}
        onChange={(e) => setDeliveryBoyId(e.target.value)}
        placeholder="Enter Delivery Boy ID"
      />
      <button onClick={handleAssignClick}>Assign Delivery Boy</button>
    </div>
  );
};

export default AssignDeliveryBoy;