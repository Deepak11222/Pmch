import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "./Style.css";
import { Link } from 'react-router-dom';
import { Modal, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const ManageSpecialties = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [itemsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get('/api/auth/specialties');
      setSpecialties(response.data);
    } catch (error) {
      console.error('Error fetching Specialties:', error);
      setError('Failed to fetch Specialties');
    }
  };

  const handleEditModalOpen = (specialty) => {
    setSelectedSpecialty(specialty);
    setTitle(specialty.title);
    setDescription(specialty.description);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedSpecialty(null);
    setTitle('');
    setDescription('');
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]); // Update image state with the selected file
    }
  };
  
  const handleSaveSpecialty = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData(); // Create FormData object to append fields
      formData.append('title', title);
      formData.append('description', description);
      if (image) {
        formData.append('image', image); // Append the image file
      }
  
      const response = await axios.put(`/api/auth/specialties/${selectedSpecialty._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      });
  
      if (response.data.success) {
        console.log('Specialty updated successfully');
        fetchSpecialties(); // Refresh specialties after update
        handleEditModalClose(); // Close edit modal
        setSuccessMessage('Specialty updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to update specialty:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating specialty:', error);
    }
  };

  const handleDeleteSpecialty = async (id) => {
    try {
      const response = await axios.delete(`/api/auth/specialties/${id}`);
      if (response.data.success) {
        console.log('Specialty deleted successfully');
        fetchSpecialties();
        setSuccessMessage('Specialty deleted successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to delete specialty:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting specialty:', error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(specialties.length / itemsPerPage);

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

  // Display specialties for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSpecialties = specialties.slice(startIndex, endIndex);

  return (
    <div className="container mt-5">
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
          {successMessage}
        </Alert>
      )}
      <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:"white"}}>
          <h4 className="card-title">Manage Specialties</h4>
          <Link to="/admin/add-specialties" className="btn btn-primary">Add Specialty</Link>
        </div>
        <div className="card-body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Title</th>
                {/* <th>Description</th> */}
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSpecialties.map((specialty, index) => (
                <tr key={specialty._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{specialty.title}</td>
                  {/* <td>{specialty.description}</td> */}
                  <td><img src={`data:image/png;base64,${specialty.image}`} alt="Specialty" style={{ width: '100px' }} /></td>
                  <td>
      <button onClick={() => handleEditModalOpen(specialty)} className="btn btn-primary mr-2">
        <FaEdit />
      </button>
      <button onClick={() => handleDeleteSpecialty(specialty._id)} className="btn btn-danger">
        <FaTrash />
      </button>
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
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Specialty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveSpecialty} encType="multipart/form-data">
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <Button type="submit" className="btn btn-primary">Save Changes</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ManageSpecialties;