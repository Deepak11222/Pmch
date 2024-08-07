import React, { useState } from 'react';
import axios from 'axios';

const AddMedicineType = () => {
  const [medicineType, setMedicineType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/medicine-types', {
        medicineType,
      });

      if (response.data.success) {
        alert('Medicine type added successfully');
        // Optionally, clear form fields or update state
        setMedicineType('');
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
      <h2>Add Medicine Type</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Medicine Type:</label>
          <input type="text" value={medicineType} onChange={(e) => setMedicineType(e.target.value)} required />
        </div>
        <button type="submit">Add Medicine Type</button>
      </form>
    </div>
  );
};

export default AddMedicineType;