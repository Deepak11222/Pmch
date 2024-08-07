import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditTpa = () => {
  const { tpaId } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [image, setImage] = useState(null);
  const [tpa, setTpa] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTpaDetails = async () => {
      try {
        const response = await axios.get(`/api/auth/tpa/${tpaId}`);
        setTpa(response.data.data);
        setCompanyName(response.data.data.company); // Assuming 'company' is the field name for company name
      } catch (error) {
        setError('Error fetching TPA details: ' + error.message);
      }
    };

    fetchTpaDetails();
  }, [tpaId]);

  const handleSaveTpa = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('companyName', companyName);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(`/api/auth/tpa/${tpaId}`, formData);
      if (response.data.success) {
        console.log('TPA updated successfully');
        // Optionally, redirect the user to another page after successful update
      } else {
        console.error('Failed to update TPA:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating TPA:', error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!tpa) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit TPA</h2>
      <form onSubmit={handleSaveTpa} encType="multipart/form-data">
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTpa;