import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const ManageStore = () => {
    const [stores, setStores] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const response = await axios.get('/api/auth/store');
            setStores(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
            setError('Failed to fetch stores');
        }
    };

    const handleDeleteModalOpen = (store) => {
        setSelectedStore(store);
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedStore(null);
        setShowDeleteModal(false);
    };

    const handleEditModalOpen = (store) => {
        setSelectedStore(store);
        setName(store.name);
        setLocation(store.location);
        setPhoneNumber(store.phoneNumber);
        setEmail(store.email);
        setPassword(store.password);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setName('');
        setLocation('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setShowEditModal(false);
        setSelectedStore(null);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`/api/auth/store/${selectedStore._id}`, { name, location,phoneNumber, email, password });
            if (response.data.success) {
                console.log('Store edited successfully');
                fetchStores();
                handleEditModalClose();
            } else {
                console.error('Failed to edit store:', response.data.message);
            }
        } catch (error) {
            console.error('Error editing store:', error);
        }
    };

    const handleDeleteStore = async () => {
        try {
            const response = await axios.delete(`/api/auth/store/${selectedStore._id}`);
            if (response.data.success) {
                console.log('Store deleted successfully');
                fetchStores();
                handleDeleteModalClose();
            } else {
                console.error('Failed to delete store:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting store:', error);
        }
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(stores.length / itemsPerPage);

    // Calculate starting and ending indices for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the stores array to get the items for the current page
    const currentStores = stores.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
            <div className="card">
                <div className="card-header" >
        {/* <h4 className="card-title">Manage Stock</h4> */}
        <Link to="/admin/add-store" className="btn btn-primary">Add Store</Link>
      </div>
                <div className="card-body">
                    <Table striped bordered hover>
                        <thead  className='thead'>
                            <tr>
                                <th>S.No.</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {currentStores.map((store, index) => (
                                <tr key={store._id}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{store.name}</td>
                                    <td>{store.location}</td>
                                    <td>{store.phoneNumber}</td>
                                    <td>{store.email}</td>
                                    <td>{store.password}</td>
                                    <td>
                                        <Button onClick={() => handleEditModalOpen(store)} className="btn btn-sm btn-info mr-2">Edit</Button>
                                        <Button onClick={() => handleDeleteModalOpen(store)} className="btn btn-sm btn-danger">Delete</Button>
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
                    <Modal.Title>Edit Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="number" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this store?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteStore}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageStore;