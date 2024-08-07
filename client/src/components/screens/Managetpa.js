import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modal, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const Managetpa = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tpas, setTpas] = useState([]);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [image, setImage] = useState(null);
  const [editTpa, setEditTpa] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [itemsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteConfirmationTpa, setDeleteConfirmationTpa] = useState(null);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditModalOpen = (tpa) => {
    setEditTpa(tpa);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditTpa(null);
    setShowEditModal(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSaveTpa = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('company', companyName);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/submittpa', formData);

      if (response.data.success) {
        console.log('TPA added successfully');
        fetchTpas(); // Fetch TPAs after adding a new TPA
        setShowModal(false); // Close modal after adding a new TPA
        setSuccessMessage('TPA added successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to add TPA:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding TPA:', error);
    }
  };

  const handleUpdateTpa = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('company', editTpa.company);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`/api/auth/tpa/${editTpa._id}`, formData);

      if (response.data.success) {
        console.log('TPA updated successfully');
        fetchTpas(); // Fetch TPAs after updating TPA details
        handleEditModalClose(); // Close modal after updating TPA details
        setSuccessMessage('TPA updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to update TPA:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating TPA:', error);
    }
  };

  const handleDeleteTpa = async (tpaId) => {
    try {
      const response = await axios.delete(`/api/auth/tpa/${tpaId}`);
      if (response.data.success) {
        console.log('TPA deleted successfully');
        fetchTpas(); // Fetch TPAs after deleting a TPA
        setSuccessMessage('TPA deleted successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to delete TPA:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting TPA:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmationTpa) {
      await handleDeleteTpa(deleteConfirmationTpa._id);
      setDeleteConfirmationTpa(null);
    }
  };

  const fetchTpas = async () => {
    try {
      const response = await axios.get('/api/auth/tpa');
      setTpas(response.data);

      // Assuming the image data is returned as base64-encoded string in the 'image' field of each TPA object
      const tpasWithImages = response.data.map(tpa => ({
        ...tpa,
        image: `data:image/png;base64,${tpa.image}` // Adjust the format if the image format is different
      }));
      setTpas(tpasWithImages);
    } catch (error) {
      console.error('Error fetching TPAs:', error);
      setError('Failed to fetch TPAs');
    }
  };

  useEffect(() => {
    fetchTpas();
  }, []);

  const totalPages = Math.ceil(tpas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTpas = tpas.slice(startIndex, endIndex);

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
        <h4 className="card-title">Manage TPA</h4>
        <Link to="/admin/add-tpa" className="btn btn-primary">Add TPA</Link>
      </div>
      <div className="card-body">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Company Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTpas.map((tpa, index) => (
              <tr key={tpa._id}>
                <td>{startIndex + index + 1}</td>
                <td>{tpa.company}</td>
                <td><img src={tpa.image} alt={tpa.company} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td>
  <Button variant="primary" onClick={() => handleEditModalOpen(tpa)} className="mr-2">
    <FaEdit /> {/* Edit Icon */}
  </Button>
  <Button variant="danger" onClick={() => setDeleteConfirmationTpa(tpa)}>
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
          <Modal.Title>Add TPA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveTpa} encType="multipart/form-data">
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Add TPA</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit TPA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateTpa} encType="multipart/form-data">
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" className="form-control" value={editTpa?.company} onChange={(e) => setEditTpa({ ...editTpa, company: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update TPA</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={!!deleteConfirmationTpa} onHide={() => setDeleteConfirmationTpa(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {deleteConfirmationTpa?.company}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmationTpa(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Managetpa;