import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import { Modal, Button, Table, Alert } from 'react-bootstrap';

const ManageContent = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [heading, setHeading] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState(null);
  const itemsPerPage = 10;
  const [goToPage, setGoToPage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/auth/pagedata');
      const pageData = response.data.pageData.map(item => ({
        ...item,
        image1: `data:image/png;base64,${item.image1}`,
        image2: `data:image/png;base64,${item.image2}`
      }));
      setContentData(pageData);
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to fetch content');
    }
  };

  const handleEditModalOpen = (contentItem) => {
    setSelectedContent(contentItem);
    setHeading(contentItem.heading);
    setTitle(contentItem.title);
    setContent(contentItem.content);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedContent(null);
    setTitle('');
    setContent('');
    setSuccessMessage('Content updated successfully');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleSaveContent = async () => {
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

      const response = await axios.put(`/api/auth/pagedata/${selectedContent._id}`, formData);

      if (response.data.success) {
        console.log('Content updated successfully');
        fetchContent();
        handleEditModalClose();
      } else {
        console.error('Failed to update content:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  const handleDeleteModalOpen = (contentItem) => {
    setSelectedContent(contentItem);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedContent(null);
  };

  const handleDeleteContent = async () => {
    try {
      const id = selectedContent._id;
      const response = await axios.delete(`/api/auth/pagedata/${id}`);
      if (response.data.success) {
        console.log('Content deleted successfully');
        fetchContent();
        setShowDeleteModal(false);
        setSuccessMessage('Content deleted successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to delete content:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const totalPages = Math.ceil(contentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContent = contentData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoToPageChange = (e) => {
    const pageInput = parseInt(e.target.value);
    if (!isNaN(pageInput) && pageInput >= 1 && pageInput <= totalPages) {
      setCurrentPage(pageInput);
    }
    setGoToPage(e.target.value);
  };

  return (
    <div className="card">
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
          {successMessage}
        </Alert>
      )}
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "white" }}>
        <h4 className="card-title">Manage Content</h4>
        <Link to="/admin/add-content" className="btn btn-primary">Add Content</Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Title</th>
                <th>Heading</th>
                <th>Image 1</th>
                <th>Image 2</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContent.map((contentItem, index) => (
                <tr key={contentItem._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{contentItem.title}</td>
                  <td dangerouslySetInnerHTML={{ __html: contentItem.heading }}></td>
                  <td>
                    <img src={contentItem.image1} alt="Image 1" style={{ width: '100px' }} />
                  </td>
                  <td>
                    <img src={contentItem.image2} alt="Image 2" style={{ width: '100px' }} />
                  </td>
                  <td>
  <button
    className="btn btn-primary btn-sm"
    onClick={() => handleEditModalOpen(contentItem)}
  >
    <FaEdit /> {/* Edit Icon */}
  </button>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDeleteModalOpen(contentItem)}
  >
    <FaTrash /> {/* Delete Icon */}
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-between">
          <span>Page <strong>{currentPage} of {totalPages}</strong></span>
          <span className="table-index">
            Go to page : <input type="number" className="ml-2" value={goToPage} onChange={handleGoToPageChange} />
          </span>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
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
          <Button variant="primary" onClick={handleSaveContent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this content?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteContent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageContent;