import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import 'react-quill/dist/quill.snow.css';

const AddGM = () => {
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get('/api/auth/pagesubcategories'); // Adjusted endpoint to fetch pages from PageSubCategory
      setPages(response.data.data);
    } catch (error) {
      console.error('Error fetching pages:', error.message);
    }
  };

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

  const handleSaveGM = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('page', selectedPage);

      if (image1) {
        formData.append('image1', image1);
      }
      if (image2) {
        formData.append('image2', image2);
      }

      const response = await axios.post('/api/auth/gm', formData);

      if (response.data.success) {
        console.log('GM entry added successfully');
        // Redirect to ManageGM page after adding data
        history.push('/manage-gm');
      } else {
        console.error('Failed to add GM entry:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding GM entry:', error);
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card card-default">
          <form onSubmit={handleSaveGM} encType="multipart/form-data">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ textAlign: 'left' }}>Short Description</label>
                    <ReactQuill value={heading} onChange={setHeading} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ textAlign: 'left' }}>GM Title</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label style={{ textAlign: 'left' }}>GM Content</label>
                    <ReactQuill value={content} onChange={setContent} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ textAlign: 'left' }}>Image 1</label>
                    <input type="file" className="form-control" name="image1" onChange={handleFile1Change} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ textAlign: 'left' }}>Image 2</label>
                    <input type="file" className="form-control" name="image2" onChange={handleFile2Change} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label style={{ textAlign: 'left' }}>Select Page:</label>
                    <select
                      className="form-control"
                      value={selectedPage}
                      onChange={(e) => setSelectedPage(e.target.value)}
                    >
                      <option value="">Select Page</option>
                      {pages.map((page) => (
                        <option key={page._id} value={page._id}>
                          {page.subPage}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group text-right">
                    <button type="submit" className="btn btn-primary">Add GM</button>
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

export default AddGM;