import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const ManageOPD = () => {
    const [opdData, setOPDData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [goToPage, setGoToPage] = useState('');
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [opdIdToDelete, setOPDIdToDelete] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editOPDData, setEditOPDData] = useState(null);
    const [editErrors, setEditErrors] = useState({});
    const [editSuccessMessage, setEditSuccessMessage] = useState('');

    const itemsPerPage = 10;

    useEffect(() => {
        fetchOPDData();
    }, [currentPage]);

    const fetchOPDData = async () => {
        try {
            const response = await axios.get(`/api/auth/opd?page=${currentPage}&perPage=${itemsPerPage}`);
            setOPDData(response.data);
        } catch (error) {
            console.error('Error fetching OPD data:', error);
        }
    };

    const totalPages = Math.ceil(opdData.totalCount / itemsPerPage);

    const handleDelete = async (opdId) => {
        setOPDIdToDelete(opdId);
        setDeleteConfirmationModal(true);
    };

    const handleGoToPageChange = (e) => {
        const pageInput = parseInt(e.target.value);
        if (!isNaN(pageInput) && pageInput >= 1 && pageInput <= totalPages) {
            setCurrentPage(pageInput);
        }
        setGoToPage(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = (opd) => {
        setEditOPDData(opd);
        setEditModalVisible(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/auth/opd/${editOPDData._id}`, editOPDData);
            if (response.data.success) {
                setEditSuccessMessage('OPD entry updated successfully');
                fetchOPDData(); // Refresh OPD data after successful update
                setEditModalVisible(false); // Close the edit modal
            } else {
                console.error('Failed to update OPD entry:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating OPD entry:', error);
        }
    };
    
    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`/api/auth/opd/${opdIdToDelete}`);
            if (response.data.success) {
                setOPDData(opdData.filter(opd => opd._id !== opdIdToDelete));
            } else {
                console.error('Failed to delete OPD entry:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting OPD entry:', error);
        }
        setDeleteConfirmationModal(false);
    };

    return (
        <>
            <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "white" }}>
                    <h4 className="card-title">Manage OPD</h4>
                    <Link to="/admin/add-opd" className="btn btn-primary">Add OPD Entry</Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Doctor</th>
                                    <th>Department</th>
                                    <th>SUN</th>
                                    <th>MON</th>
                                    <th>TUE</th>
                                    <th>WED</th>
                                    <th>THU</th>
                                    <th>FRI</th>
                                    <th>SAT</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {opdData.map((opd, index) => (
                                    <tr key={index}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{opd.doctor.name}</td>
                                        <td>{opd.department}</td>
                                        <td>{opd.schedule.day1}</td>
                                        <td>{opd.schedule.day2}</td>
                                        <td>{opd.schedule.day3}</td>
                                        <td>{opd.schedule.day4}</td>
                                        <td>{opd.schedule.day5}</td>
                                        <td>{opd.schedule.day6}</td>
                                        <td>{opd.schedule.day7}</td>
                                        <td>
                                        <button onClick={() => handleEdit(opd)} className="btn btn-primary mr-2">
        <FaEdit />
      </button>
                                            {/* <button className="btn btn-primary btn-sm ms-2" onClick={() => handleEdit(opd)}>Edit</button> */}
                                            <button onClick={() => handleDelete(opd._id)} className="btn btn-danger">
        <FaTrash />
      </button>
                                            {/* <button className="btn btn-danger btn-sm" onClick={() => handleDelete(opd._id)}>Delete</button> */}
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
            <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Edit OPD Entry</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {editOPDData && (
            <form onSubmit={handleEditSubmit}>
                {/* Doctor's Name */}
                <div className="mb-3">
                    <label htmlFor="doctorName" className="form-label">Doctor's Name</label>
                    <input type="text" className="form-control" id="doctorName" value={editOPDData?.doctor?.name || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, doctor: { ...prevState.doctor, name: e.target.value } }))} />
                </div>
                {/* Department */}
                <div className="mb-3">
    <label htmlFor="department" className="form-label">Department</label>
    <input 
        type="text" 
        className="form-control" 
        id="department" 
        value={editOPDData?.department || ''} 
        onChange={(e) => setEditOPDData(prevState => ({ ...prevState, department: e.target.value }))}
    />
</div>

<div className="mb-3">
    <label htmlFor="qualification" className="form-label">Qualification</label>
    <input 
        type="text" 
        className="form-control" 
        id="qualification" 
        value={editOPDData?.qualification || ''} 
        onChange={(e) => setEditOPDData(prevState => ({ ...prevState, qualification: e.target.value }))}
    />
</div>

<div className="mb-3">
    <label htmlFor="designation" className="form-label">Designation</label>
    <input 
        type="text" 
        className="form-control" 
        id="designation" 
        value={editOPDData?.designation || ''} 
        onChange={(e) => setEditOPDData(prevState => ({ ...prevState, designation: e.target.value }))}
    />
</div>

                {/* Days */}
                <div className="mb-3">
                    <label htmlFor="day1" className="form-label">SUN</label>
                    <input type="text" className="form-control" id="day1" value={editOPDData?.schedule?.day1 || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, schedule: { ...prevState.schedule, day1: e.target.value } }))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="day2" className="form-label">MON</label>
                    <input type="text" className="form-control" id="day2" value={editOPDData?.schedule?.day2 || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, schedule: { ...prevState.schedule, day2: e.target.value } }))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="day3" className="form-label">TUE</label>
                    <input type="text" className="form-control" id="day3" value={editOPDData?.schedule?.day3 || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, schedule: { ...prevState.schedule, day3: e.target.value } }))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="day4" className="form-label">WED</label>
                    <input type="text" className="form-control" id="day4" value={editOPDData?.schedule?.day4 || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, schedule: { ...prevState.schedule, day4: e.target.value } }))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="day5" className="form-label">THU</label>
                    <input type="text" className="form-control" id="day5" value={editOPDData?.schedule?.day5 || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, schedule: { ...prevState.schedule, day5: e.target.value } }))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="day6" className="form-label">FRI</label>
                    <input type="text" className="form-control" id="day6" value={editOPDData?.schedule?.day6 || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, schedule: { ...prevState.schedule, day6: e.target.value } }))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="day7" className="form-label">SAT</label>
                    <input type="text" className="form-control" id="day7" value={editOPDData?.schedule?.day7 || ''} onChange={(e) => setEditOPDData(prevState => ({ ...prevState, schedule: { ...prevState.schedule, day7: e.target.value } }))} />
                </div>
                {/* Submit button */}
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        )}
    </Modal.Body>
</Modal>

            <Modal show={deleteConfirmationModal} onHide={() => setDeleteConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this OPD entry?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setDeleteConfirmationModal(false)}>Cancel</button>
                    <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageOPD;