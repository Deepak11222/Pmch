import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Managedoctors = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [itemsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteConfirmationDoctor, setDeleteConfirmationDoctor] = useState(null);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditModalOpen = (doctor) => {
    setEditDoctor(doctor);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditDoctor(null);
    setShowEditModal(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSaveDoctor = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('qualification', qualification);
      formData.append('department', department);
      formData.append('designation', designation);
      formData.append('description', description);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/submitdoctor', formData);

      if (response.data.success) {
        console.log('Doctor added successfully');
        fetchDoctors(); // Fetch doctors after adding a new doctor
        setShowModal(false); // Close modal after adding a new doctor
        setSuccessMessage('Doctor added successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to add doctor:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', editDoctor.name);
      formData.append('qualification', editDoctor.qualification);
      formData.append('department', editDoctor.department);
      formData.append('designation', editDoctor.designation);
      formData.append('description', editDoctor.description);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`/api/auth/doctors/${editDoctor._id}`, formData);

      if (response.data.success) {
        console.log('Doctor updated successfully');
        fetchDoctors(); // Fetch doctors after updating doctor details
        handleEditModalClose(); // Close modal after updating doctor details
        setSuccessMessage('Doctor updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to update doctor:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await axios.delete(`/api/auth/doctors/${doctorId}`);
      if (response.data.success) {
        console.log('Doctor deleted successfully');
        fetchDoctors(); // Fetch doctors after deleting a doctor
        setSuccessMessage('Doctor deleted successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to delete doctor:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmationDoctor) {
      await handleDeleteDoctor(deleteConfirmationDoctor._id);
      setDeleteConfirmationDoctor(null);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/auth/doctors');
      setDoctors(response.data);

      // Assuming the image data is returned as base64-encoded string in the 'image' field of each doctor object
      const doctorsWithImages = response.data.map(doctor => ({
        ...doctor,
        image: `data:image/png;base64,${doctor.image}` // Adjust the format if the image format is different
      }));
      setDoctors(doctorsWithImages);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const totalPages = Math.ceil(doctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = doctors.slice(startIndex, endIndex);

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
        <h4 className="card-title">Manage Doctors</h4>
        <Link to="/admin/add-doctor" className="btn btn-primary">Add Doctor</Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Qualification</th>
                <th>Department</th>
                <th>Designation</th>
                {/* <th>Description</th> */}
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDoctors.map((doctor, index) => (
                <tr key={doctor._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.qualification}</td>
                  <td>{doctor.department}</td>
                  <td>{doctor.designation}</td>
                  {/* <td>{doctor.description}</td> */}
                  <td><img src={doctor.image} alt={doctor.name} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td> {/* Adjust the maximum width and height */}
                  <td>
  <button className="btn btn-primary mr-2" onClick={() => handleEditModalOpen(doctor)}>
    <FaEdit /> {/* Edit Icon */}
  </button>
  <button className="btn btn-danger" onClick={() => setDeleteConfirmationDoctor(doctor)}>
    <FaTrash /> {/* Delete Icon */}
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSaveDoctor} encType="multipart/form-data">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Qualification</label>
              <input type="text" className="form-control" value={qualification} onChange={(e) => setQualification(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Add Doctor</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleUpdateDoctor} encType="multipart/form-data">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={editDoctor?.name} onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Qualification</label>
              <input type="text" className="form-control" value={editDoctor?.qualification} onChange={(e) => setEditDoctor({ ...editDoctor, qualification: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input type="text" className="form-control" value={editDoctor?.department} onChange={(e) => setEditDoctor({ ...editDoctor, department: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input type="text" className="form-control" value={editDoctor?.designation} onChange={(e) => setEditDoctor({ ...editDoctor, designation: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" value={editDoctor?.description} onChange={(e) => setEditDoctor({ ...editDoctor, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update Doctor</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={!!deleteConfirmationDoctor} onHide={() => setDeleteConfirmationDoctor(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {deleteConfirmationDoctor?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmationDoctor(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Managedoctors;