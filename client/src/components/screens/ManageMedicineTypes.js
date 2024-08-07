import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const ManageMedicineTypes = () => {
  const [medicineTypes, setMedicineTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicineTypes();
  }, []);

  const fetchMedicineTypes = async () => {
    try {
      const response = await axios.get('/api/auth/medicine-types');
      if (response.data.success) {
        setMedicineTypes(response.data.data);
      } else {
        setError('Failed to fetch medicine types');
      }
    } catch (error) {
      console.error('Error fetching medicine types:', error);
      setError('Failed to fetch medicine types');
    }
  };

  const toggleStatus = async (medicineTypeId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await axios.put(`/api/auth/medicine-types/${medicineTypeId}`, { status: newStatus });
      if (response.data.success) {
        fetchMedicineTypes();
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
        <Link to="/storeadmin/addmedicine-type" className="btn btn-primary">Add Medicine Type</Link>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {medicineTypes.length === 0 && !error && <div>No medicine types available.</div>}
        {medicineTypes.length > 0 && (
          <Table striped bordered hover>
            <thead className='thead'>
              <tr>
                <th>S.No.</th>
                <th>Medicine Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {medicineTypes.map((medicineType, index) => (
                <tr key={medicineType._id}>
                  <td>{index + 1}</td>
                  <td>{medicineType.medicineType}</td>
                  <td>{medicineType.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button
                      variant={medicineType.status === 1 ? 'warning' : 'success'}
                      size="sm"
                      onClick={() => toggleStatus(medicineType._id, medicineType.status)}
                    >
                      {medicineType.status === 1 ? 'Deactivate' : 'Activate'}
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

export default ManageMedicineTypes;