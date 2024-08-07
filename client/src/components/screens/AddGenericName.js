import React, { useState } from 'react';
import axios from 'axios';

const AddGenericName = () => {
  const [genericName, setGenericName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/generic-names', { genericName });
      if (response.data.success) {
        alert('Generic name added successfully');
        setGenericName('');
      } else {
        alert('Failed to add generic name');
      }
    } catch (error) {
      console.error('Error adding generic name:', error);
      alert('Failed to add generic name');
    }
  };

  return (
    <div>
      <h2>Add Generic Name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Generic Name:</label>
          <input
            type="text"
            value={genericName}
            onChange={(e) => setGenericName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Generic Name</button>
      </form>
    </div>
  );
};

export default AddGenericName;