import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const ManageGenericNames = () => {
  const [genericNames, setGenericNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGenericNames();
  }, []);

  const fetchGenericNames = async () => {
    try {
      const response = await axios.get('/api/auth/generic-names');
      if (response.data.success) {
        setGenericNames(response.data.data);
      } else {
        setError('Failed to fetch generic names');
      }
    } catch (error) {
      console.error('Error fetching generic names:', error);
      setError('Failed to fetch generic names');
    }
  };

  const toggleStatus = async (genericNameId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await axios.put(`/api/auth/generic-names/${genericNameId}`, { status: newStatus });
      if (response.data.success) {
        fetchGenericNames();
      } else {
        setError('Failed to update generic name status');
      }
    } catch (error) {
      console.error('Error updating generic name status:', error);
      setError('Failed to update generic name status');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <Link to="/storeadmin/addgeneric-name" className="btn btn-primary">Add Generic Name</Link>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {genericNames.length === 0 && !error && <div>No generic names available.</div>}
        {genericNames.length > 0 && (
          <Table striped bordered hover>
            <thead className='thead'>
              <tr>
                <th>S.No.</th>
                <th>Generic Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {genericNames.map((genericName, index) => (
                <tr key={genericName._id}>
                  <td>{index + 1}</td>
                  <td>{genericName.genericName}</td>
                  <td>{genericName.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button
                      variant={genericName.status === 1 ? 'warning' : 'success'}
                      size="sm"
                      onClick={() => toggleStatus(genericName._id, genericName.status)}
                    >
                      {genericName.status === 1 ? 'Deactivate' : 'Activate'}
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

export default ManageGenericNames;