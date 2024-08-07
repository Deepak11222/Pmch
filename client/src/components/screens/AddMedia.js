import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddMedia = () => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', imageName);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/auth/media', formData);

      if (response.data.success) {
        console.log('Media added successfully');
        history.push('/admin/manage-media'); // Redirect to Manage Media page after adding media
      } else {
        console.error('Failed to add media:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding media:', error);
    }
  };  

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card card-default">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Image Name</label>
                    <input type="text" className="form-control" name="name" value={imageName} onChange={(e) => setImageName(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Image</label>
                    <input type="file" className="form-control" name="image" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group text-right">
                    <button type="submit" className="btn btn-primary">Add Media</button>
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

export default AddMedia;