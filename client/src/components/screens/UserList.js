import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/customers');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  const handleDeleteModalOpen = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  const handleEditModalOpen = (user) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/customers/${selectedUser._id}`, {
        firstName,
        lastName,
        email,
        phone
      });
      if (response.data.success) {
        console.log('User edited successfully');
        fetchUsers();
        handleEditModalClose();
      } else {
        console.error('Failed to edit user:', response.data.message);
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/customers/${selectedUser._id}`);
      if (response.data.success) {
        console.log('User deleted successfully');
        fetchUsers();
        handleDeleteModalClose();
      } else {
        console.error('Failed to delete user:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Calculate starting and ending indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the users array to get the items for the current page
  const currentUsers = users.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="card">
      <div className="card-header">
        <Link to="/admin/add-user" className="btn btn-primary">Add User</Link>
      </div>
      <div className="card-body">
        <Table striped bordered hover>
          <thead className="thead">
            <tr>
              <th>S.No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{startIndex + index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Button onClick={() => handleEditModalOpen(user)} className="btn btn-sm btn-info mr-2">Edit</Button>
                  <Button onClick={() => handleDeleteModalOpen(user)} className="btn btn-sm btn-danger">Delete</Button>
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

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteUser}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;