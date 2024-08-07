import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useHistory } from 'react-router-dom';

const AddContent = () => {
    const [selectedPage, setSelectedPage] = useState('');
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [heading, setHeading] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetchSubCategoryOptions();
    }, []);

    const fetchSubCategoryOptions = async () => {
        try {
            const response = await axios.get('/api/auth/pagesubcategories');
            setSubCategoryOptions(response.data.data);
        } catch (error) {
            console.error('Error fetching subcategory options:', error.message);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('heading', heading);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('selectedPage', selectedPage);

            if (image1) {
                formData.append('image1', image1);
            }
            if (image2) {
                formData.append('image2', image2);
            }

            const response = await axios.post('/api/auth/submitpagedata', formData);

            if (response.data.success) {
                console.log('Page data added successfully');
                history.push('/admin/manage-content');
            } else {
                console.error('Failed to add page data:', response.data.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
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
                                        <label>Short Description</label>
                                        <ReactQuill value={heading} onChange={setHeading} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Page Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Page Content</label>
                                        <ReactQuill value={content} onChange={setContent} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Image 1</label>
                                        <input type="file" className="form-control" name="image1" onChange={handleFile1Change} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Image 2</label>
                                        <input type="file" className="form-control" name="image2" onChange={handleFile2Change} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Select Page:</label>
                                        <select className="form-control" value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
                                            <option value="">Select Page</option>
                                            {subCategoryOptions.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.subPage}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group text-right">
                                        <button type="submit" className="btn btn-primary">Add Content</button>
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

export default AddContent;
