import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const ManageGals = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [gals, setGals] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [selectedGals, setSelectedGals] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    fetchGals();
  }, []);
  
  const fetchGals = async () => {
    try {
      const response = await axios.get('/api/auth/gals');
      const galsData = response.data;
  
      const galsWithImages = galsData.map(gals => ({
        ...gals,
        // Assuming GALS model has image1 and image2 fields
        image1: `data:image/png;base64,${gals.image1}`,
        image2: `data:image/png;base64,${gals.image2}`
      }));
  
      setGals(galsWithImages);
    } catch (error) {
      console.error('Error fetching GALS:', error);
      setError('Failed to fetch GALS');
    }
  };

  const handleEditModalOpen = (gals) => {
    setSelectedGals(gals);
    setHeading(gals.heading);
    setTitle(gals.title);
    setContent(gals.content);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedGals(null);
    setTitle('');
    setContent('');
  };

  const handleSaveGals = async () => {
    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('content', content);
      if (image1) {
        formData.append('image1', image1);
      }
      if (image2) {
        formData.append('image2', image2);
      }

      const response = await axios.put(`/api/auth/gals/${selectedGals._id}`, formData);

      if (response.data.success) {
        console.log('GALS updated successfully');
        fetchGals(); // Fetch GALS after updating
        handleEditModalClose();
      } else {
        console.error('Failed to update GALS:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating GALS:', error);
    }
  };

  const handleDeleteGals = async (id) => {
    try {
      const response = await axios.delete(`/api/auth/gals/${id}`);
      if (response.data.success) {
        console.log('GALS deleted successfully');
        fetchGals();
      } else {
        console.error('Failed to delete GALS:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting GALS:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header" style={{ background: '#01a3ff', color: '#fff' }}>
          <h4 className="card-title">Manage GALS</h4>
          <Link to="/add-gals" className="btn btn-primary">Add GALS</Link>
        </div>
        <div className="card-body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Heading</th>
                <th>Title</th>
                <th>Content</th>
                <th>Image 1</th>
                <th>Image 2</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gals.map((galsItem, index) => (
                <tr key={galsItem._id}>
                  <td>{index + 1}</td>
                  <td>{galsItem.heading}</td>
                  <td>{galsItem.title}</td>
                  <td>{galsItem.content}</td>
                  <td><img src={galsItem.image1} alt="Image 1" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                  <td><img src={galsItem.image2} alt="Image 2" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                  <td>
                    <Button onClick={() => handleEditModalOpen(galsItem)} className="btn btn-sm btn-info mr-2">Edit</Button>
                    <Button onClick={() => handleDeleteGals(galsItem._id)} className="btn btn-sm btn-danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit GALS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Heading</label>
            <input type="text" className="form-control" value={heading} onChange={(e) => setHeading(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Image 1</label>
            <input type="file" className="form-control" onChange={(e) => setImage1(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Image 2</label>
            <input type="file" className="form-control" onChange={(e) => setImage2(e.target.files[0])} />
          </div>
          <Button variant="primary" onClick={handleSaveGals}>Save Changes</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageGals;