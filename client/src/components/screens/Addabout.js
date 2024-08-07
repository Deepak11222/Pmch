import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddAbout = () => {
  const [heading, setHeading] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  // const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/about', formData);

      if (response.data.success) {
        console.log('About added successfully');
        // Redirect to the manage about page or any other appropriate page
      } else {
        console.error('Failed to add about:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding about:', error);
      // setError('Failed to add about');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header" style={{ background: '#01a3ff', color: '#fff' }}>
          <h4 className="card-title">Add About</h4>
          <Link to="/manage-about" className="btn btn-primary">Back to Manage About</Link>
        </div>
        <div className="card-body">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="heading">
              <Form.Label>Heading</Form.Label>
              <Form.Control type="text" placeholder="Enter heading" value={heading} onChange={(e) => setHeading(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddAbout;