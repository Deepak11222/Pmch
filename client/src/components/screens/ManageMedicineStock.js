import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ManageStock = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchMedicines();
  }, [currentPage]);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem('storeAuthToken');
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.store) {
        const storeId = decodedToken.store;
        const response = await axios.get(`/api/auth/medicines/${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setMedicines(response.data.data);
        } else {
          setError('Failed to fetch medicines');
        }
      } else {
        setError('Decoded token does not contain store ID');
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setError('Failed to fetch medicines');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleEditModalOpen = (medicine) => {
    setSelectedMedicine(medicine);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedMedicine(null);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setSelectedMedicine(prevMedicine => ({
      ...prevMedicine,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('storeAuthToken');
      const response = await axios.put(`/api/auth/medicine-data/${selectedMedicine._id}`, selectedMedicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        fetchMedicines();
        handleEditModalClose();
        setSuccessMessage('Medicine updated successfully');
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      setError('Failed to save changes');
    }
  };

  const handleDelete = async (medicineId) => {
    try {
      const token = localStorage.getItem('storeAuthToken');
      const response = await axios.delete(`/api/auth/medicine-data/${medicineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setMedicines(medicines.filter(medicine => medicine._id !== medicineId));
        setSuccessMessage('Medicine deleted successfully');
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError('Failed to delete medicine');
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
      setError('Failed to delete medicine');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(medicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicines = medicines.slice(startIndex, endIndex);

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
      <div className="card-header">
        <Link to="/storeadmin/add-medicine" className="btn btn-primary">Add Medicine</Link>
      </div>
      <div className="card-body">
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
            {successMessage}
          </Alert>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {medicines.length === 0 && !error && <div>No medicines available.</div>}
        {medicines.length > 0 && (
          <div>
            <Table striped bordered hover>
              <thead className='thead'>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Expiry Date</th>
                  <th>Batch Number</th>
                  <th>Availability Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='tbody'>
                {currentMedicines.map((medicine, index) => (
                  <tr key={medicine._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{medicine.medicineName}</td>
                    <td>{formatDate(medicine.expiryDate)}</td>
                    <td>{medicine.batchNumber}</td>
                    <td>{medicine.qty}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEditModalOpen(medicine)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(medicine._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between">
              <span>Page <strong>{currentPage} of {totalPages}</strong></span>

              <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
            {/* {Array.from({ length: totalPages }, (_, i) => (
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
            ))} */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
              <span className="table-index">
                Go to page : <input type="number" className="ml-2" value={goToPage} onChange={handleGoToPageChange} />
              </span>
            </div>
                      </div>
        )}
        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Medicine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedMedicine && (
              <div>
                <p>Medicine ID: {selectedMedicine._id}</p>
                <div className="form-group">
                  <label htmlFor="medicineName">Medicine Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="medicineName"
                    value={selectedMedicine.medicineName}
                    onChange={(e) => handleInputChange(e, 'medicineName')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryDate"
                    value={selectedMedicine.expiryDate}
                    onChange={(e) => handleInputChange(e, 'expiryDate')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="batchNumber">Batch Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="batchNumber"
                    value={selectedMedicine.batchNumber}
                    onChange={(e) => handleInputChange(e, 'batchNumber')}
                  />
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ManageStock;