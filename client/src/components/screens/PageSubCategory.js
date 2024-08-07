import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Pagination, Table } from 'react-bootstrap';
import axios from 'axios';

const PageSubCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [pageSubCategories, setPageSubCategories] = useState([]);
  const [pageCategories, setPageCategories] = useState([]);
  const [subCategory, setSubCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [slug, setSlug] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [itemsPerPage] = useState(5);
  const [enteredPage, setEnteredPage] = useState('');

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditModal(false);
    setEditIndex(null);
    setSubCategory('');
    setCategoryId('');
    setSlug('');
    setErrors({});
    setSuccessMessage('');
  };

  const handleEditModalOpen = (index) => {
    setEditIndex(index);
    const subCategoryToEdit = currentItems[index];
    setSubCategory(subCategoryToEdit.subPage);
    setCategoryId(subCategoryToEdit.category._id);
    setSlug(subCategoryToEdit.slug);
    setEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditModal(false);
    setEditIndex(null);
    setSubCategory('');
    setCategoryId('');
    setSlug('');
    setErrors({});
    setSuccessMessage('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!subCategory.trim()) {
      newErrors['subCategory'] = 'Subcategory is required';
    }

    if (!categoryId.trim()) {
      newErrors['categoryId'] = 'Category is required';
    }

    if (!slug.trim()) {
      newErrors['slug'] = 'Slug is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('/api/auth/submitpagesubcategory', {
        category: categoryId,
        subPage: subCategory,
        slug: slug
      });

      if (response.data.success) {
        setSuccessMessage('Page subcategory information submitted successfully');
        fetchPageSubCategories();
        handleModalClose();
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        setErrors({ submit: 'Failed to submit page subcategory information' });
      }
    } catch (error) {
      setErrors({ submit: 'Error submitting page subcategory information' });
      console.error('Error submitting page subcategory information:', error.message);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!subCategory.trim()) {
      newErrors['subCategory'] = 'Subcategory is required';
    }

    if (!categoryId.trim()) {
      newErrors['categoryId'] = 'Category is required';
    }

    if (!slug.trim()) {
      newErrors['slug'] = 'Slug is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.put(`/api/auth/pagesubcategories/${currentItems[editIndex]._id}`, {
        category: categoryId,
        subPage: subCategory,
        slug: slug
      });

      if (response.data.success) {
        setSuccessMessage('Page subcategory information updated successfully');
        fetchPageSubCategories();
        handleEditModalClose();
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        setErrors({ submit: 'Failed to update page subcategory information' });
      }
    } catch (error) {
      setErrors({ submit: 'Error updating page subcategory information' });
      console.error('Error updating page subcategory information:', error.message);
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`/api/auth/pagesubcategories/${currentItems[index]._id}`);

      if (response.data.success) {
        setSuccessMessage('Page subcategory information deleted successfully');
        fetchPageSubCategories();
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        setErrors({ delete: 'Failed to delete page subcategory information' });
      }
    } catch (error) {
      setErrors({ delete: 'Error deleting page subcategory information' });
      console.error('Error deleting page subcategory information:', error.message);
    }
  };

  const fetchPageSubCategories = async () => {
    try {
      const response = await axios.get('/api/auth/pagesubcategories');
      setPageSubCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching page subcategories:', error.message);
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
    fetchPageSubCategories();
    fetchPageCategories();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pageSubCategories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pageSubCategories.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const pageInput = parseInt(goToPage);
    if (!isNaN(pageInput) && pageInput >= 1 && pageInput <= totalPages) {
      setCurrentPage(pageInput);
      setEnteredPage(pageInput);
      setGoToPage('');
    } else {
      setEnteredPage('');
    }
  }, [goToPage, totalPages]);

  return (
    <div className="card">
      <div className="card-header" style={{ background: "white", display: 'flex', justifyContent: 'space-between' }}>
        <h4 className="card-title">Page Subcategories</h4>
        <Button variant="primary" onClick={handleModalOpen}>Add Subcategory</Button>
      </div>
      <div className="card-body">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Slug</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((subCategory, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{subCategory.category.page}</td>
                <td>{subCategory.subPage}</td>
                <td>{subCategory.slug}</td>
                <td>
  <Button variant="info" onClick={() => handleEditModalOpen(index)}>
    <FaEdit /> {/* Edit Icon */}
  </Button>{' '}
  <Button variant="danger" onClick={() => handleDelete(index)}>
    <FaTrash /> {/* Delete Icon */}
  </Button>
</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span>Page <strong>{currentPage} of {totalPages}</strong></span>
          </div>
          <div className="table-index">
            <span>Go to page :</span>
            <input type="number" className="ml-2" value={goToPage} onChange={(e) => setGoToPage(e.target.value)} />
            {enteredPage && <span className="ml-2">({totalPages} pages total)</span>}
          </div>
        </div>
        <Pagination className="mt-3">
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="subCategory">Subcategory:</label>
              <input
                type="text"
                id="subCategory"
                className={`form-control ${errors['subCategory'] ? 'is-invalid' : ''}`}
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
              {errors['subCategory'] && <div className="invalid-feedback">{errors['subCategory']}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="categoryId">Category ID:</label>
              <select
                id="categoryId"
                className={`form-control ${errors['categoryId'] ? 'is-invalid' : ''}`}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {pageCategories.map(category => (
                  <option key={category._id} value={category._id}>{category.page}</option>
                ))}
              </select>
              {errors['categoryId'] && <div className="invalid-feedback">{errors['categoryId']}</div>}
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
      <Modal show={editModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditFormSubmit}>
            <div className="form-group">
              <label htmlFor="subCategory">Subcategory:</label>
              <input
                type="text"
                id="subCategory"
                className={`form-control ${errors['subCategory'] ? 'is-invalid' : ''}`}
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
              {errors['subCategory'] && <div className="invalid-feedback">{errors['subCategory']}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="categoryId">Category ID:</label>
              <select
                id="categoryId"
                className={`form-control ${errors['categoryId'] ? 'is-invalid' : ''}`}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {pageCategories.map(category => (
                  <option key={category._id} value={category._id}>{category.page}</option>
                ))}
              </select>
              {errors['categoryId'] && <div className="invalid-feedback">{errors['categoryId']}</div>}
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
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PageSubCategory;
