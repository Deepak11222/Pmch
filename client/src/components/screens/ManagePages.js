import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const ManagePages = () => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get('/api/auth/pages');
      setPages(response.data.data);
    } catch (error) {
      console.error('Error fetching pages:', error.message);
      setError('Failed to fetch pages');
    }
  };

  return (
    <div className="container mt-5">
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      <div className="card">
        <div className="card-header" style={{ background: '#01a3ff', color: '#fff' }}>
          <h4 className="card-title">Manage Pages</h4>
          <Link to="/add-content" className="btn btn-primary">Add Content</Link>
        </div>
        <div className="card-body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Page Name</th>
                <th>Content</th>
                {/* Add more columns here as needed */}
              </tr>
            </thead>
            <tbody>
              {pages.map((page, index) => (
                <tr key={page._id}>
                  <td>{index + 1}</td>
                  <td>{page.name}</td>
                  <td>{page.content}</td>
                  {/* Add more columns here as needed */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManagePages;