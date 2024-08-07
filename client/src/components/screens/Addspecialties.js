import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';


const AddSpecialties = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();


  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description); // Use description state

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/specialties', formData);

      if (response.data.success) {
        history.push('/admin/manage-specialties');
        console.log('Specialties added successfully');
      } else {
        console.error('Failed to add specialties:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding specialties:', error);
    }
  };  

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card card-default">
          <form onSubmit={handleSave} encType="multipart/form-data">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Empty column to align with layout */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    {/* Replace textarea with ReactQuill */}
                    <ReactQuill value={description} onChange={setDescription} />
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
                    <button type="submit" className="btn btn-primary">Add Specialties</button>
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

export default AddSpecialties;