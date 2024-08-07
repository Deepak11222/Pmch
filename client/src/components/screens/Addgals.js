import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddGyna = () => {
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleFile1Change = (e) => {
    if (e.target.files.length > 0) {
      setImage1(e.target.files[0]);
    }
  };

  const handleFile2Change = (e) => {
    if (e.target.files.length > 0) {
      setImage2(e.target.files[0]);
    }
  };

  const handleSaveGyna = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('content', content);

      if (image1) {
        formData.append('image1', image1);
      }
      if (image2) {
        formData.append('image2', image2);
      }

      const response = await axios.post('/api/auth/gals', formData);

      if (response.data.success) {
        console.log('Gyna added successfully');
      } else {
        console.error('Failed to add cardiology:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding cardiology:', error);
    }
  };

  return (
    <div className="add-cardiology-form">
      <form onSubmit={handleSaveGyna} encType="multipart/form-data">
        <div className="form-group">
          <label>Short Description</label>
          <ReactQuill value={heading} onChange={setHeading} />
        </div>
        <div className="form-group">
          <label>Cardiology Title</label>
          <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Cardiology Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <div className="form-group">
          <label>Image 1</label>
          <input type="file" className="form-control" name="image1" onChange={handleFile1Change} />
        </div>
        <div className="form-group">
          <label>Image 2</label>
          <input type="file" className="form-control" name="image2" onChange={handleFile2Change} />
        </div>
        <button type="submit" className="btn btn-primary">Add Gyna</button>
      </form>
    </div>
  );
};

export default AddGyna;