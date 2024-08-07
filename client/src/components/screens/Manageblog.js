import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modal, Button, Alert, Table } from 'react-bootstrap';
import axios from 'axios';

const ManageBlog = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [shortdiscription, setShortDescription] = useState('');
  const [blogtitle, setBlogTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const [itemsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const handleEditModalOpen = (blog) => {
    setSelectedBlog(blog);
    setShortDescription(blog.shortdiscription);
    setBlogTitle(blog.blogtitle);
    setContent(blog.content);
    setImage(blog.image);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedBlog(null);
    setShortDescription('');
    setBlogTitle('');
    setContent('');
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('shortdiscription', shortdiscription);
      formData.append('blogtitle', blogtitle);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`/api/auth/blog/${selectedBlog._id}`, formData);

      if (response.data.success) {
        console.log('Blog updated successfully');
        fetchBlogs(); // Fetch blogs after updating
        handleEditModalClose();
        setSuccessMessage('Blog updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        console.error('Failed to update blog:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleDeleteConfirmation = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteBlog = async () => {
    try {
      const response = await axios.delete(`/api/auth/blog/${blogToDelete._id}`);
      if (response.data.success) {
        console.log('Blog deleted successfully');
        fetchBlogs();
        setSuccessMessage('Blog deleted successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setShowDeleteConfirmation(false);
      } else {
        console.error('Failed to delete blog:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/auth/blog');
      const blogsData = response.data;

      // Assuming the image data is returned as base64-encoded string in the 'image' field of each blog object
      const blogsWithImages = blogsData.map(blog => ({
        ...blog,
        image: `data:image/png;base64,${blog.image}` // Adjust the format if the image format is different
      }));

      setBlogs(blogsWithImages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Pagination
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

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

  // Display blogs for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  return (
    <div className="card">
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
          {successMessage}
        </Alert>
      )}
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:"white"}}>
                <h4 className="card-title">Manage Blogs</h4>
        <Link to="/admin/add-blog" className="btn btn-primary">Add Blog</Link>
      </div>
      <div className="card-body">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Description</th>
              <th>Blog Title</th>
              <th>Blog Content</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{startIndex + index + 1}</td>
                <td>{blog.shortDescription}</td>
                <td>{blog.blogtitle}</td>
                <td dangerouslySetInnerHTML={{ __html: blog.content }}></td>
                <td><img src={blog.image} alt={blog.blogtitle} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td>
  <Button onClick={() => handleEditModalOpen(blog)} className="btn btn-sm btn-info">
    <FaEdit /> {/* Edit Icon */}
  </Button>
  <Button onClick={() => handleDeleteConfirmation(blog)} className="btn btn-sm btn-danger">
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
      {/* Edit Blog Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveBlog} encType="multipart/form-data">
            <div className="form-group">
              <label>Short Description</label>
              <input type="text" className="form-control" value={shortdiscription} onChange={(e) => setShortDescription(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Blog Title</label>
              <input type="text" className="form-control" value={blogtitle} onChange={(e) => setBlogTitle(e.target.value)} />
            </div>
          <div className="form-group">
            <label>Content</label>
            <ReactQuill value={content || ''} onChange={setContent} />
          </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <Button type="submit" className="btn btn-primary">Save Changes</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteBlog}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageBlog;