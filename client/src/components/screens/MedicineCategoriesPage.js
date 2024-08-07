import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const ManageMedicineCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/auth/medicine-categories');
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError('Failed to fetch medicine categories');
      }
    } catch (error) {
      console.error('Error fetching medicine categories:', error);
      setError('Failed to fetch medicine categories');
    }
  };

  const toggleStatus = async (categoryId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await axios.put(`/api/auth/medicine-categories/${categoryId}`, { status: newStatus });
      if (response.data.success) {
        fetchCategories();
      } else {
        setError('Failed to update category status');
      }
    } catch (error) {
      console.error('Error updating category status:', error);
      setError('Failed to update category status');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <Link to="/storeadmin/addmedicine-category" className="btn btn-primary">Add Medicine Category</Link>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {categories.length === 0 && !error && <div>No medicine categories available.</div>}
        {categories.length > 0 && (
          <Table striped bordered hover>
            <thead className='thead'>
              <tr>
                <th>S.No.</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.category}</td>
                  <td>{category.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button
                      variant={category.status === 1 ? 'warning' : 'success'}
                      size="sm"
                      onClick={() => toggleStatus(category._id, category.status)}
                    >
                      {category.status === 1 ? 'Deactivate' : 'Activate'}
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

export default ManageMedicineCategories;