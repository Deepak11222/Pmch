import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [fee, setFee] = useState('');
  const [rating, setRating] = useState(0);
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch specialties for the dropdown
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('/specialties');
        setSpecialties(response.data.specialties);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };
    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobileNumber', mobileNumber);
    formData.append('qualification', qualification);
    formData.append('experience', experience);
    formData.append('age', age);
    formData.append('department', department);
    formData.append('designation', designation);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('fee', fee);
    formData.append('rating', rating);
    formData.append('type', type); // This should be the specialty ID
    if (image) {
      formData.append('image', image);
    }
  
    console.log('Form Data:', formData); // Log the form data
  
    try {
      const response = await axios.post('http://localhost:3000/doctor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Doctor added successfully:', response.data);
      setMessage('Doctor added successfully!');
    } catch (error) {
      setMessage('Error adding doctor.');
      console.error('Error adding doctor:', error);
    }
  };
  

  return (
    <div>
      <h1>Add Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Mobile Number</label>
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </div>
        <div>
        <label>Qualification</label>
          <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} />
        </div>
        <div>
                    <label>Experience</label>
          <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </div>
        <div>
        <label>Age</label>
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Department</label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label>Designation</label>
          <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Fee</label>
          <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} />
        </div>
        <div>
          <label>Rating (0-5)</label>
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label>Specialty</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty._id}>
                {specialty.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Add Doctor</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddDoctor;