import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const ManageManufacturer = () => {
  const [manufacturer, setManufacturer] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchManufacturer();
  }, []);

  const fetchManufacturer = async () => {
    try {
      const response = await axios.get('/api/auth/manufacturer');
      if (response.data.success) {
        setManufacturer(response.data.data);
      } else {
        setError('Failed to fetch medicine types');
      }
    } catch (error) {
      console.error('Error fetching medicine types:', error);
      setError('Failed to fetch medicine types');
    }
  };

  const toggleStatus = async (manufacturerId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await axios.put(`/api/auth/manufacturer/${manufacturerId}`, { status: newStatus });
      if (response.data.success) {
        fetchManufacturer();
      } else {
        setError('Failed to update medicine type status');
      }
    } catch (error) {
      console.error('Error updating medicine type status:', error);
      setError('Failed to update medicine type status');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <Link to="/storeadmin/addmanufacturer" className="btn btn-primary">Add Medicine Type</Link>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {manufacturer.length === 0 && !error && <div>No medicine types available.</div>}
        {manufacturer.length > 0 && (
          <Table striped bordered hover>
            <thead className='thead'>
              <tr>
                <th>S.No.</th>
                <th>Manufacturer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {manufacturer.map((manufacturer, index) => (
                <tr key={manufacturer._id}>
                  <td>{index + 1}</td>
                  <td>{manufacturer.manufacturer}</td>
                  <td>{manufacturer.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button
                      variant={manufacturer.status === 1 ? 'warning' : 'success'}
                      size="sm"
                      onClick={() => toggleStatus(manufacturer._id, manufacturer.status)}
                    >
                      {manufacturer.status === 1 ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageManufacturer;