import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import { Modal, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const ManageGM = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [gm, setGM] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [selectedGM, setSelectedGM] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  const itemsPerPage = 1;

  useEffect(() => {
    fetchGM();
  }, []);

  const fetchGM = async () => {
    try {
      const response = await axios.get('/api/auth/gm');
      const gmData = response.data;

      const gmWithImages = gmData.map(gm => ({
        ...gm,
        image1: `data:image/png;base64,${gm.image1}`,
        image2: `data:image/png;base64,${gm.image2}`
      }));

      setGM(gmWithImages);
    } catch (error) {
      console.error('Error fetching GM:', error);
      setError('Failed to fetch GM');
    }
  };

  const handleEditModalOpen = (gm) => {
    setSelectedGM(gm);
    setHeading(gm.heading);
    setTitle(gm.title);
    setContent(gm.content);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedGM(null);
    setTitle('');
    setContent('');
    setSuccessMessage('GM updated successfully'); // Set success message after successful update
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000); // Auto close success message after 5 seconds
  };

  const handleSaveGM = async () => {
    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image1', image);
      }
      if (image2) {
        formData.append('image2', image2);
      }

      const response = await axios.put(`/api/auth/gm/${selectedGM._id}`, formData);

      if (response.data.success) {
        console.log('GM updated successfully');
        fetchGM();
        handleEditModalClose();
      } else {
        console.error('Failed to update GM:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating GM:', error);
    }
  };

  const handleDeleteModalOpen = (gm) => {
    setSelectedGM(gm);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedGM(null);
  };

  const handleDeleteGM = async () => {
    try {
      const id = selectedGM._id;
      const response = await axios.delete(`/api/auth/gm/${id}`);
      if (response.data.success) {
        console.log('GM deleted successfully');
        fetchGM();
        setShowDeleteModal(false);
        setSuccessMessage('GM deleted successfully'); // Set success message after successful deletion
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000); // Auto close success message after 5 seconds
      } else {
        console.error('Failed to delete GM:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting GM:', error);
    }
  };

  const totalPages = Math.ceil(gm.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGM = gm.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5">
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
          {successMessage}
        </Alert>
      )}
      <div className="card">
        <div className="card-header" style={{ background: '#01a3ff', color: '#fff' }}>
          <h4 className="card-title">Manage General Medicine</h4>
          <Link to="/add-gm" className="btn btn-primary">Add General Medicine</Link>
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
              {currentGM.map((gmItem, index) => (
                <tr key={gmItem._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{gmItem.heading}</td>
                  <td dangerouslySetInnerHTML={{ __html: gmItem.title }}></td>
                  <td dangerouslySetInnerHTML={{ __html: gmItem.content }}></td>
                  <td><img src={gmItem.image1} alt="Image 1" style={{ width: '100px' }} /></td>
                  <td><img src={gmItem.image2} alt="Image 2" style={{ width: '100px' }} /></td>
                  <td>
                    <button className="btn btn-primary mr-2" onClick={() => handleEditModalOpen(gmItem)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteModalOpen(gmItem)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit General Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Short Description</label>
            <ReactQuill value={heading || ''} onChange={setHeading} />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Content</label>
            <ReactQuill value={content || ''} onChange={setContent} />
          </div>
          <div className="form-group">
            <label>Image 1</label>
            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Image 2</label>
            <input type="file" className="form-control" onChange={(e) => setImage2(e.target.files[0])} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveGM}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this General Medicine entry?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteGM}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageGM;