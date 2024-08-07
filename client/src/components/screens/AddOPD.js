import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const AddOPD = () => {
    const [doctors, setDoctors] = useState([]);
    const [qualification, setQualification] = useState('');
    const [newOPD, setNewOPD] = useState({
        doctorId: '',
        department: '',
        qualification: '',
        designation: '', // Initialize designation field
        day1: '',
        day2: '',
        day3: '',
        day4: '',
        day5: '',
        day6: '',
        day7: ''
    });
    const history = useHistory();

    useEffect(() => {
        // Fetch doctors data
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/api/auth/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'qualification') {
            setQualification(value); // Update qualification state
        } else {
            setNewOPD({ ...newOPD, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/opd', {
                ...newOPD,
                qualification: qualification // Add qualification field to the request body
            });
            if (response.data.success) {
                // Redirect to ManageOPD page after adding OPD entry
                history.push('/admin/manage-opd');
            } else {
                console.error('Failed to add OPD entry:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding OPD entry:', error);
        }
    };
    
    return (
        <>
            <div className="container">
                <h2>Add New OPD Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Department</label>
                        <input type="text" name="department" value={newOPD.department} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                    <label>Designation</label>
                    <input type="text" name="designation" value={newOPD.designation} onChange={handleInputChange} className="form-control" />
                </div>
                    <div className="form-group">
                        <label>Qualification</label>
                        <input type="text" name="qualification" value={qualification} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Doctor</label>
                        <select name="doctorId" value={newOPD.doctorId} onChange={handleInputChange} className="form-control">
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>SUN</label>
                        <input type="text" name="day1" value={newOPD.day1} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>MON</label>
                        <input type="text" name="day2" value={newOPD.day2} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>TUE</label>
                        <input type="text" name="day3" value={newOPD.day3} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>WED</label>
                        <input type="text" name="day4" value={newOPD.day4} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>THU</label>
                        <input type="text" name="day5" value={newOPD.day5} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>FRI</label>
                        <input type="text" name="day6" value={newOPD.day6} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>SAT</label>
                        <input type="text" name="day7" value={newOPD.day7} onChange={handleInputChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add OPD Entry</button>
                </form>
            </div>
        </>
    );
};

export default AddOPD;