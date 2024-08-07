import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';

const AddDoctorForm = () => {
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSaveDoctor = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('qualification', qualification);
      formData.append('department', department);
      formData.append('designation', designation);
      formData.append('description', description);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/submitdoctor', formData);

      if (response.data.success) {
        history.push('/admin/manage-doctors');
        console.log('Doctor added successfully');
      } else {
        console.error('Failed to add doctor:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="card card-default">
          <div className="card-header">
            <h3 className="card-title">Add Doctor</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSaveDoctor} encType="multipart/form-data">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Qualification</label>
                    <input type="text" className="form-control" name="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Department</label>
                    <input type="text" className="form-control" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Designation</label>
                    <input type="text" className="form-control" name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <ReactQuill value={description} onChange={setDescription} /> {/* Quill editor for description */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Image</label>
                    <input type="file" className="form-control" name="image" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group text-right">
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddDoctorForm;