import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/doctor');
        // Ensure the response data is an array
        if (Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        } else {
          console.error('Unexpected response structure', response.data);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();

    // Check authentication status and get customer ID
    const checkAuthentication = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            setIsAuthenticated(true);
            setCustomerId(response.data.user._id); // Replace with actual response data structure
          })
          .catch(() => {
            setIsAuthenticated(false);
          });
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('You must be logged in to book a doctor.');
      return;
    }

    try {
      const response = await axios.post('/bookings', {
        customerId,
        doctorId: selectedDoctor,
        bookingDate,
        comments,
        rating
      });
      console.log('Booking successful:', response.data);
    } catch (error) {
      console.error('Error booking doctor:', error);
    }
  };

  return (
    <div>
      <h1>Book a Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor</label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
            <option value="">Select Doctor</option>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))
            ) : (
              <option value="">No doctors available</option>
            )}
          </select>
        </div>
        <div>
          <label>Booking Date</label>
          <input type="datetime-local" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
        </div>
        <div>
          <label>Comments</label>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
        </div>
        <div>
          <label>Rating (0-5)</label>
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Doctor</button>
      </form>
    </div>
  );
};

export default BookDoctor;