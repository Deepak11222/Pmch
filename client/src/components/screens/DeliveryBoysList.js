import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const DeliveryBoysList = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [orders, setOrders] = useState([]); // New state for orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDeliveryBoysAndOrders();
  }, []);

  const fetchDeliveryBoysAndOrders = async () => {
    try {
      const [deliveryBoysResponse, ordersResponse] = await Promise.all([
        axios.get('/delivery-boys'),
        axios.get('/orders')
      ]);
  
      console.log('Delivery Boys:', deliveryBoysResponse.data);
      console.log('Orders:', ordersResponse.data);
  
      const ordersWithAssignedBoys = ordersResponse.data.reduce((acc, order) => {
        if (order.deliveryBoyId) {
          acc[order.deliveryBoyId] = true;
        }
        return acc;
      }, {});
  
      const updatedDeliveryBoys = deliveryBoysResponse.data.map((boy) => {
        if (ordersWithAssignedBoys[boy._id]) {
          boy.status = 'unavailable';
        }
        return boy;
      });
  
      setDeliveryBoys(updatedDeliveryBoys);
      setOrders(ordersResponse.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  const handleDeleteModalOpen = (boy) => {
    setSelectedDeliveryBoy(boy);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedDeliveryBoy(null);
    setShowDeleteModal(false);
  };

  const handleEditModalOpen = (boy) => {
    setSelectedDeliveryBoy(boy);
    setName(boy.name);
    setPhone(boy.phone);
    setStatus(boy.status);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setName('');
    setPhone('');
    setStatus('');
    setShowEditModal(false);
    setSelectedDeliveryBoy(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`/delivery-boys/${selectedDeliveryBoy._id}`, {
        name,
        phone,
        status
      });
      if (response.data.success) {
        console.log('Delivery boy edited successfully');
        fetchDeliveryBoysAndOrders();
        handleEditModalClose();
      } else {
        console.error('Failed to edit delivery boy:', response.data.message);
      }
    } catch (error) {
      console.error('Error editing delivery boy:', error);
    }
  };

  const handleDeleteDeliveryBoy = async () => {
    try {
      const response = await axios.delete(`/delivery-boys/${selectedDeliveryBoy._id}`);
      if (response.data.success) {
        console.log('Delivery boy deleted successfully');
        fetchDeliveryBoysAndOrders();
        handleDeleteModalClose();
      } else {
        console.error('Failed to delete delivery boy:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting delivery boy:', error);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'secondary';
      case 'available':
        return 'primary';
      case 'busy':
        return 'warning';
      case 'unavailable':
        return 'danger';
      default:
        return 'light';
    }
  };

  const totalPages = Math.ceil(deliveryBoys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDeliveryBoys = deliveryBoys.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card">
      <div className="card-header">
        <Button className="btn btn-primary">Add Delivery Boy</Button>
      </div>
      <div className="card-body">
        <Table striped bordered hover>
          <thead className="thead">
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {currentDeliveryBoys.map((boy, index) => (
              <tr key={boy._id}>
                <td>{startIndex + index + 1}</td>
                <td>{boy.name}</td>
                <td>{boy.phone}</td>
                <td>
                  <Button variant={getStatusVariant(boy.status)} disabled>
                    {boy.status}
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleEditModalOpen(boy)} className="btn btn-sm btn-info mr-2">Edit</Button>
                  <Button onClick={() => handleDeleteModalOpen(boy)} className="btn btn-sm btn-danger">Delete</Button>
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
          <Modal.Title>Edit Delivery Boy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Delivery Boy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this delivery boy?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteDeliveryBoy}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeliveryBoysList;