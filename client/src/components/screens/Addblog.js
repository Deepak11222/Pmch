import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const AddBlog = () => {
  const [shortdiscription, setShortdiscription] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

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
      formData.append('title', title);
      formData.append('content', content);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/blog', formData);

      if (response.data.success) {
        console.log('Blog added successfully');
      } else {
        console.error('Failed to add blog:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };  

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card card-default">
          <form onSubmit={handleSaveBlog} encType="multipart/form-data">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Short Description</label>
                    <input type="text" className="form-control" name="shortdiscription" value={shortdiscription} onChange={(e) => setShortdiscription(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Blog Title</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Blog Content</label>
                    <ReactQuill value={content} onChange={setContent} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Image</label>
                    <input type="file" className="form-control" name="image" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Empty column to align with layout */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group text-right">
                    <button type="submit" className="btn btn-primary">Add Blog</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBlog;