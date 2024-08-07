import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddTpa = () => {
    const [company, setCompany] = useState("");
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
            formData.append('company', company);

            if (image) {
                formData.append('image', image);
            }

            const response = await axios.post('/api/auth/tpa', formData);

            if (response.data.success) {
                console.log('TPA added successfully');
                history.push('/admin/manage-content');
                } else {
                console.error('Failed to add TPA:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding TPA:', error);
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
                                        <label>Company Name</label>
                                        <input type="text" className="form-control" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
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
                                        <button type="submit" className="btn btn-primary">Add TPA</button>
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

export default AddTpa;