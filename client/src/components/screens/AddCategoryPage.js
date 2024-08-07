import React, { useState } from 'react';
import axios from 'axios';

const AddMedicineCategory = () => {
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/medicine-categories', {
        category,
      });

      if (response.data.success) {
        alert('Medicine category added successfully');
        setCategory('');
      } else {
        alert('Failed to add medicine category');
      }
    } catch (error) {
      console.error('Error adding medicine category:', error);
      alert('Failed to add medicine category');
    }
  };

  return (
    <div>
      <h2>Add Medicine Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <button type="submit">Add Medicine Category</button>
      </form>
    </div>
  );
};

export default AddMedicineCategory;