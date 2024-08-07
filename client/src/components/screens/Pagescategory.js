import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const PagesCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState('');
  const [slug, setSlug] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [editCategory, setEditCategory] = useState(null);
  const [editPage, setEditPage] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editErrors, setEditErrors] = useState({});
  const [editSuccessMessage, setEditSuccessMessage] = useState('');
  const [pageCategories, setPageCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const itemsPerPage = 5;

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditModalOpen = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!page.trim()) {
      newErrors['page'] = 'Page is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('/api/auth/submitpagecategory', {
        page,
        slug,
      });

      if (response.data.success) {
        setSuccessMessage('Page category information submitted successfully');
        setPage('');
        setSlug('');
        fetchPageCategories();
      } else {
        setErrors({ submit: 'Failed to submit page category information' });
      }
    } catch (error) {
      setErrors({ submit: 'Error submitting page category information' });
      console.error('Error submitting page category information:', error.message);
    }
  };

  const fetchPageCategories = async () => {
    try {
      const response = await axios.get('/api/auth/pagecategories');
      setPageCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching page categories:', error.message);
    }
  };

  useEffect(() => {
    fetchPageCategories();
  }, []);

  const handleEdit = async (category) => {
    setEditCategory(category);
    setEditPage(category.page);
    setEditSlug(category.slug);
    setEditSuccessMessage('');
    setEditErrors({});
    handleEditModalOpen();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!editPage.trim()) {
      newErrors['editPage'] = 'Page is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      return;
    }

    try {
      const response = await axios.put(`/api/auth/pagecategories/${editCategory._id}`, {
        page: editPage,
        slug: editSlug,
      });

      if (response.data.success) {
        setEditSuccessMessage('Page category information updated successfully');
        fetchPageCategories();
        setShowEditModal(false);
        setSuccessMessage('Page category information updated successfully'); // Set success message after successful update
      } else {
        setEditErrors({ submit: 'Failed to update page category information' });
      }
    } catch (error) {
      setEditErrors({ submit: 'Error updating page category information' });
      console.error('Error updating page category information:', error.message);
    }
  };

  const handleDelete = async (category) => {
    setCategoryToDelete(category);
    setDeleteConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/api/auth/pagecategories/${categoryToDelete._id}`);
      if (response.data.success) {
        setSuccessMessage('Page category deleted successfully');
        fetchPageCategories();
        setDeleteConfirmationModal(false);
      } else {
        setErrors({ delete: 'Failed to delete page category' });
      }
    } catch (error) {
      setErrors({ delete: 'Error deleting page category' });
      console.error('Error deleting page category:', error.message);
    }
  };

  const totalPages = Math.ceil(pageCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = pageCategories.slice(startIndex, endIndex);

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

  return (
    <div className="card">
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:"white"}}>
        <h4 className="card-title">Pages Category</h4>
        {/* <button type="button" class="me-2 btn btn-primary">Primary</button> */}
        <Link to="/admin/addstore" className="btn btn-primary">Add Specialty</Link>
      </div>
      <div className="card-body">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Pages</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{category.page}</td>
                <td>{category.slug}</td>
                <td>
  <Button variant="primary" onClick={() => handleEdit(category)}>
    <FaEdit /> {/* Edit Icon */}
  </Button>{' '}
  <Button variant="danger" onClick={() => handleDelete(category)}>
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
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="page">Page:</label>
              <input
                type="text"
                id="page"
                className={`form-control ${errors['page'] ? 'is-invalid' : ''}`}
                value={page}
                onChange={(e) => setPage(e.target.value)}
              />
              {errors['page'] && <div className="invalid-feedback">{errors['page']}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug:</label>
              <input
                type="text"
                id="slug"
                className={`form-control ${errors['slug'] ? 'is-invalid' : ''}`}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              {errors['slug'] && <div className="invalid-feedback">{errors['slug']}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Page Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="editPage">Page:</label>
              <input
                type="text"
                id="editPage"
                className={`form-control ${editErrors['editPage'] ? 'is-invalid' : ''}`}
                value={editPage}
                onChange={(e) => setEditPage(e.target.value)}
              />
              {editErrors['editPage'] && <div className="invalid-feedback">{editErrors['editPage']}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="editSlug">Slug:</label>
              <input
                type="text"
                id="editSlug"
                className={`form-control ${editErrors['editSlug'] ? 'is-invalid' : ''}`}
                value={editSlug}
                onChange={(e) => setEditSlug(e.target.value)}
              />
              {editErrors['editSlug'] && <div className="invalid-feedback">{editErrors['editSlug']}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteConfirmationModal} onHide={() => setDeleteConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this page category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PagesCategory;