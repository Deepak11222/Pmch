import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const ManageCardiology = () => {
    const [storesPages, setStoresPages] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    // const [image1, setImage1] = useState('');
    // const [image2, setImage2] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    useEffect(() => {
        fetchStorePages();
    }, []);

    const fetchStorePages = async () => {
        try {
            const response = await axios.get('/api/auth/stores');
            const storeData = response.data;

            // setCardiologyPages(cardiologyWithImages);
        } catch (error) {
            console.error('Error fetching cardiologies:', error);
            setError('Failed to fetch cardiologies');
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
        // setImage1(store.phonenumber);
        // setImage2(store.email);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setName('');
        setLocation('');
        // setImage1('');
        // setImage2('');
        setShowEditModal(false);
        setSelectedStore(null);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`/api/auth/store/${selectedStore._id}`, { name, location });
            if (response.data.success) {
                console.log('Store page edited successfully');
                fetchStorePages();
                handleEditModalClose();
            } else {
                console.error('Failed to edit store page:', response.data.message);
            }
        } catch (error) {
            console.error('Error editing store page:', error);
        }
    };

    const handleDeleteStore = async () => {
        try {
            const response = await axios.delete(`/api/auth/store/${selectedStore._id}`);
            if (response.data.success) {
                console.log('Store page deleted successfully');
                fetchStorePages();
                handleDeleteModalClose();
            } else {
                console.error('Failed to delete store page:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting store page:', error);
        }
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(storesPages.length / itemsPerPage);

    // Calculate starting and ending indices for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the cardiologyPages array to get the items for the current page
    const currentStorePages = storesPages.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-5">
            <div className="card">
            <div className="card-header" style={{ background: '#01a3ff', display: 'flex', justifyContent: 'space-between' }}>
          <h4 className="card-title">Manage Cardiology</h4>
          <Link to="/admin/add-store" className="btn btn-primary">Add Store</Link>
        </div>
                <div className="card-body">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStorePages.map((store, index) => (
                                <tr key={store._id}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{store.name}</td>
                                    <td>{store.location}</td>
                                    {/* <td dangerouslySetInnerHTML={{ __html: cardiology.content }}></td>
                                    <td><img src={cardiology.image1} alt="Image 1" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                                    <td><img src={cardiology.image2} alt="Image 2" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td> */}
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
            </div>

            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Store Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <textarea className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    {/* <div className="form-group">
                        <label>Image 1</label>
                        <img src={image1} alt="Image 1" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div> */}
                    {/* <div className="form-group">
                        <label>Image 2</label>
                        <img src={image2} alt="Image 2" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Cardiology Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this cardiology page?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteStore}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageCardiology;