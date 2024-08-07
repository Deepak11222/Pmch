import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const AddCardiology = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleFileChange1 = (e) => {
    if (e.target.files.length > 0) {
      setImage1(e.target.files[0]);
    }
  };

  const handleFileChange2 = (e) => {
    if (e.target.files.length > 0) {
      setImage2(e.target.files[0]);
    }
  };

  const handleSaveCardiology = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (image1) {
        formData.append('image1', image1);
      }

      if (image2) {
        formData.append('image2', image2);
      }

      const response = await axios.post('/api/auth/cardiology', formData);

      if (response.data.success) {
        console.log('Cardiology page added successfully');
      } else {
        console.error('Failed to add cardiology page:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding cardiology page:', error);
    }
  };  

  return (
    <div className="add-cardiology-form">
      <form onSubmit={handleSaveCardiology} encType="multipart/form-data">
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <div className="form-group">
          <label>Image 1</label>
          <input type="file" className="form-control" name="image1" onChange={handleFileChange1} />
        </div>
        <div className="form-group">
          <label>Image 2</label>
          <input type="file" className="form-control" name="image2" onChange={handleFileChange2} />
        </div>
        <button type="submit" className="btn btn-primary">Add Cardiology Page</button>
      </form>
    </div>
  );
};

export default AddCardiology;