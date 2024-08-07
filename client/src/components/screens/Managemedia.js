import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modal, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const ManageMedia = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
  const [mediaName, setMediaName] = useState('');
  const [image, setImage] = useState(null);
  const [editMedia, setEditMedia] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [itemsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteConfirmationMedia, setDeleteConfirmationMedia] = useState(null);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditModalOpen = (media) => {
    setEditMedia(media);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditMedia(null);
    setShowEditModal(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSaveMedia = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', mediaName);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/submitmedia', formData);

      if (response.data.success) {
        console.log('Media added successfully');
        fetchMedia();
        setShowModal(false);
        setSuccessMessage('Media added successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to add media:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding media:', error);
    }
  };

  const handleUpdateMedia = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', editMedia.name);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`/api/auth/media/${editMedia._id}`, formData);

      if (response.data.success) {
        console.log('Media updated successfully');
        fetchMedia();
        handleEditModalClose();
        setSuccessMessage('Media updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to update media:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating media:', error);
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    try {
      const response = await axios.delete(`/api/auth/media/${mediaId}`);
      if (response.data.success) {
        console.log('Media deleted successfully');
        fetchMedia();
        setSuccessMessage('Media deleted successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to delete media:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmationMedia) {
      await handleDeleteMedia(deleteConfirmationMedia._id);
      setDeleteConfirmationMedia(null);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await axios.get('/api/auth/media');
      const mediaData = response.data.map(mediaItem => ({
        ...mediaItem,
        image: `data:image/png;base64,${mediaItem.image}`
      }));
      setMedia(mediaData);
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to fetch media');
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const totalPages = Math.ceil(media.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedia = media.slice(startIndex, endIndex);

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
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:"white"}}>
        <h4 className="card-title">Manage Media</h4>
        <Link to="/admin/add-media" className="btn btn-primary">Add Media</Link>
      </div>
      <div className="card-body">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              {/* <th>Name</th> */}
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMedia.map((media, index) => (
              <tr key={media._id}>
                <td>{startIndex + index + 1}</td>
                {/* <td>{media.name}</td> */}
                <td><img src={media.image} alt={media.name} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td>
  <Button variant="primary" onClick={() => handleEditModalOpen(media)} className="mr-2">
    <FaEdit /> {/* Edit Icon */}
  </Button>
  <Button variant="danger" onClick={() => setDeleteConfirmationMedia(media)}>
    <FaTrash /> {/* Delete Icon */}
  </Button>
</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between">
          <span>Page <strong>{currentPage} of {totalPages}</strong></span>
          <span className="table-index">
            Go to page : <input type="number" className="ml-2" value={goToPage} onChange={handleGoToPageChange} />
          </span>
        </div>
        <nav aria-label="...">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveMedia} encType="multipart/form-data">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={mediaName} onChange={(e) => setMediaName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Add Media</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateMedia} encType="multipart/form-data">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={editMedia?.name} onChange={(e) => setEditMedia({ ...editMedia, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update Media</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={!!deleteConfirmationMedia} onHide={() => setDeleteConfirmationMedia(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {deleteConfirmationMedia?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmationMedia(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageMedia;