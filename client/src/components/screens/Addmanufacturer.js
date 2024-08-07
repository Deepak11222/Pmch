import React, { useState } from 'react';
import axios from 'axios';

const AddManufacturer = () => {
  const [manufacturer, setManufacturer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/manufacturer', {
        manufacturer,
      });

      if (response.data.success) {
        alert('Manufacturer added successfully');
        // Optionally, clear form fields or update state
        setManufacturer('');
      } else {
        alert('Failed to add medicine type');
      }
    } catch (error) {
      console.error('Error adding medicine type:', error);
      alert('Failed to add medicine type');
    }
  };

  return (
    <div>
      <h2>Add Manufacturer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Manufacturer</label>
          <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} required />
        </div>
        <button type="submit">Add Manufacturer</button>
      </form>
    </div>
  );
};

export default AddManufacturer;