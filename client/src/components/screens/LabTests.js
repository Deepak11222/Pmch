import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const ManageLabTests = () => {
    const [labTests, setLabTests] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLabTest, setSelectedLabTest] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(true);
    const [preparationInstructions, setPreparationInstructions] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Function to fetch lab tests from the server
    const fetchLabTests = async () => {
        try {
            const response = await axios.get('/lab-tests');
            setLabTests(response.data);
        } catch (error) {
            console.error('Error fetching lab tests:', error);
            setError('Failed to fetch lab tests');
        }
    };

    useEffect(() => {
        let isMounted = true;

        // Fetch lab tests
        const fetchAndSetLabTests = async () => {
            await fetchLabTests();
        };

        fetchAndSetLabTests();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleDeleteModalOpen = (labTest) => {
        setSelectedLabTest(labTest);
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedLabTest(null);
        setShowDeleteModal(false);
    };

    const handleEditModalOpen = (labTest) => {
        setSelectedLabTest(labTest);
        setName(labTest.name);
        setDescription(labTest.description);
        setCategory(labTest.category);
        setPrice(labTest.price);
        setAvailability(labTest.availability);
        setPreparationInstructions(labTest.preparationInstructions);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setAvailability(true);
        setPreparationInstructions('');
        setShowEditModal(false);
        setSelectedLabTest(null);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`/api/lab-tests/${selectedLabTest._id}`, {
                name,
                description,
                category,
                price,
                availability,
                preparationInstructions
            });
            if (response.data.success) {
                console.log('Lab test edited successfully');
                fetchLabTests(); // Call fetchLabTests to refresh the list
                handleEditModalClose();
            } else {
                console.error('Failed to edit lab test:', response.data.message);
            }
        } catch (error) {
            console.error('Error editing lab test:', error);
        }
    };

    const handleDeleteLabTest = async () => {
        try {
            const response = await axios.delete(`/api/lab-tests/${selectedLabTest._id}`);
            if (response.data.success) {
                console.log('Lab test deleted successfully');
                fetchLabTests(); // Call fetchLabTests to refresh the list
                handleDeleteModalClose();
            } else {
                console.error('Failed to delete lab test:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting lab test:', error);
        }
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(labTests.length / itemsPerPage);

    // Calculate starting and ending indices for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the labTests array to get the items for the current page
    const currentLabTests = labTests.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="card">
            <div className="card-header">
                <Link to="/admin/add-lab-test" className="btn btn-primary">Add Lab Test</Link>
            </div>
            <div className="card-body">
                <Table striped bordered hover>
                    <thead className='thead'>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Preparation Instructions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        {currentLabTests.map((labTest, index) => (
                            <tr key={labTest._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{labTest.name}</td>
                                <td>{labTest.description}</td>
                                <td>{labTest.category}</td>
                                <td>{labTest.price}</td>
                                <td>{labTest.availability ? 'Available' : 'Not Available'}</td>
                                <td>{labTest.preparationInstructions}</td>
                                <td>
                                    <Button onClick={() => handleEditModalOpen(labTest)} className="btn btn-sm btn-info mr-2">Edit</Button>
                                    <Button onClick={() => handleDeleteModalOpen(labTest)} className="btn btn-sm btn-danger">Delete</Button>
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
                    <Modal.Title>Edit Lab Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Availability</label>
                        <select className="form-control" value={availability} onChange={(e) => setAvailability(e.target.value === 'true')}>
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Preparation Instructions</label>
                        <textarea className="form-control" value={preparationInstructions} onChange={(e) => setPreparationInstructions(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Lab Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this lab test?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteLabTest}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageLabTests;