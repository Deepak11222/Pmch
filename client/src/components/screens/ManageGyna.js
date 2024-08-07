import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const ManageGyna = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [gyna, setGyna] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [selectedGyna, setSelectedGyna] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    fetchGyna();
  }, []);

  const fetchGyna = async () => {
    try {
      const response = await axios.get('/api/auth/gyna');
      const gynaData = response.data;

      const gynaWithImages = gynaData.map(gyna => ({
        ...gyna,
        image1: `data:image/png;base64,${gyna.image1}`,
        image2: `data:image/png;base64,${gyna.image2}`
      }));

      setGyna(gynaWithImages);
    } catch (error) {
      console.error('Error fetching gyna:', error);
      setError('Failed to fetch gyna');
    }
  };

  const handleEditModalOpen = (gyna) => {
    setSelectedGyna(gyna);
    setHeading(gyna.heading);
    setTitle(gyna.title);
    setContent(gyna.content);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedGyna(null);
    setTitle('');
    setContent('');
  };

  const handleSaveGyna = async () => {
    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      if (image2) {
        formData.append('image2', image2);
      }

      const response = await axios.put(`/api/auth/gyna/${selectedGyna._id}`, formData);

      if (response.data.success) {
        console.log('Gynaecology updated successfully');
        fetchGyna(); // Fetch gynaecologies after updating
        handleEditModalClose();
      } else {
        console.error('Failed to update gynaecology:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating gynaecology:', error);
    }
  };

  const handleDeleteGyna = async (id) => {
    try {
      const response = await axios.delete(`/api/auth/gyna/${id}`);
      if (response.data.success) {
        console.log('Gyna deleted successfully');
        fetchGyna();
      } else {
        console.error('Failed to delete gyna:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting gyna:', error);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(gyna.length / itemsPerPage);

  // Calculate starting and ending indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the gyna array to get the items for the current page
  const currentGyna = gyna.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header" style={{ background: '#01a3ff', color: '#fff' }}>
          <h4 className="card-title">Manage Gynaecologies</h4>
          <Link to="/add-gyna" className="btn btn-primary">Add Gynaecology</Link>
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
              {currentGyna.map((gynaItem, index) => (
                <tr key={gynaItem._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{gynaItem.heading}</td>
                  <td dangerouslySetInnerHTML={{ __html: gynaItem.title }}></td>
                  <td dangerouslySetInnerHTML={{ __html: gynaItem.content }}></td>
                  <td><img src={gynaItem.image1} alt="Image 1" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                  <td><img src={gynaItem.image2} alt="Image 2" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                  <td>
                    <Button onClick={() => handleEditModalOpen(gynaItem)} className="btn btn-sm btn-info mr-2">Edit</Button>
                    <Button onClick={() => handleDeleteGyna(gynaItem._id)} className="btn btn-sm btn-danger">Delete</Button>
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
          <Modal.Title>Edit Gynaecology</Modal.Title>
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
            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Image 2</label>
            <input type="file" className="form-control" onChange={(e) => setImage2(e.target.files[0])} />
          </div>
          <Button variant="primary" onClick={handleSaveGyna}>Save Changes</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageGyna;