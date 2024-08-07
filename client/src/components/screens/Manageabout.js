import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const ManageAbout = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [about, setAbout] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get('/api/auth/about');
      const aboutData = response.data;

      const aboutWithImages = aboutData.map(about => ({
        ...about,
        image: `data:image/png;base64,${about.image}`
      }));

      setAbout(aboutWithImages);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setError('Failed to fetch about data');
    }
  };


  const handleEditModalOpen = (about) => {
    setSelectedAbout(about);
    setHeading(about.heading);
    setTitle(about.title);
    setContent(about.content);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedAbout(null);
    setHeading('');
    setTitle('');
    setContent('');
  };

  const handleSaveAbout = async () => {
    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`/api/auth/about/${selectedAbout._id}`, formData);

      if (response.data.success) {
        console.log('About updated successfully');
        fetchAbout(); // Fetch about data after updating
        handleEditModalClose();
      } else {
        console.error('Failed to update about:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating about:', error);
    }
  };

  const handleDeleteAbout = async (id) => {
    try {
      const response = await axios.delete(`/api/auth/about/${id}`);
      if (response.data.success) {
        console.log('About deleted successfully');
        fetchAbout();
      } else {
        console.error('Failed to delete about:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting about:', error);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(about.length / itemsPerPage);

  // Calculate starting and ending indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the about array to get the items for the current page
  const currentAbout = about.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header" style={{ background: '#01a3ff', color: '#fff' }}>
          <h4 className="card-title">Manage About</h4>
          <Link to="/add-about" className="btn btn-primary">Add About</Link>
        </div>
        <div className="card-body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Heading</th>
                <th>Title</th>
                <th>Content</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAbout.map((aboutItem, index) => (
                <tr key={aboutItem._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{aboutItem.heading}</td>
                  <td dangerouslySetInnerHTML={{ __html: aboutItem.title }}></td>
                  <td dangerouslySetInnerHTML={{ __html: aboutItem.content }}></td>
                  <td><img src={aboutItem.image} alt="Image" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                  <td>
                    <Button onClick={() => handleEditModalOpen(aboutItem)} className="btn btn-sm btn-info mr-2">Edit</Button>
                    <Button onClick={() => handleDeleteAbout(aboutItem._id)} className="btn btn-sm btn-danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit About</Modal.Title>
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
            <label>Image</label>
            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <Button variant="primary" onClick={handleSaveAbout}>Save Changes</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageAbout;