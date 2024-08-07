import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function ContentSection() {
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState('');
    const [heading, setHeading] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const [contents, setContents] = useState('');
    const [image, setImage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [pageData, setPageData] = useState([]);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!page.trim()) {
            newErrors['page'] = 'Page is required';
        }
        // Add more validation for other fields as needed...

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('/api/auth/addPageData', {
                page,
                heading,
                subHeading,
                contents,
                image
            });

            if (response.data.success) {
                setSuccessMessage('Page data submitted successfully');
                setPage('');
                setHeading('');
                setSubHeading('');
                setContents('');
                setImage('');
                handleModalClose();
                fetchPageData();
            } else {
                setErrors({ submit: 'Failed to submit page data' });
            }
        } catch (error) {
            setErrors({ submit: 'Error submitting page data' });
            console.error('Error submitting page data:', error.message);
        }
    };

    const fetchPageData = async () => {
        try {
            const response = await axios.get('/api/auth/pagesubcategories');
            if (response.data.success) {
                setPageData(response.data.data);
            } else {
                console.error('Request failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching page subcategory data:', error.message);
        }
    };

    useEffect(() => {
        fetchPageData();
    }, []);

    return (
        <div>
            <div className="card">
                <div className="card-header" style={{ background: '#01a3ff', display: 'flex', justifyContent: 'space-between' }}>
                    <h4 className="card-title">Page Data</h4>
                    <Button variant="primary" onClick={handleModalOpen}>Add Page Data</Button>
                </div>
                <div className="card-body">
                    <h2>Page Data</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>S.N.</th>
                                <th>Page</th>
                                <th>Heading</th>
                                <th>Sub Heading</th>
                                <th>Contents</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.map((subcategory, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{subcategory.slug}</td>
                                    <td>{subcategory.heading}</td>
                                    <td>{subcategory.subHeading}</td>
                                    <td>{subcategory.contents}</td>
                                    <td><img src={subcategory.image} alt="" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Page Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="page">Page:</label>
                            <select
    id="page"
    className={`form-control ${errors['page'] ? 'is-invalid' : ''}`}
    value={page}
    onChange={(e) => setPage(e.target.value)}
>
    <option value="">Select Page</option>
    {/* Map over pageData to render options */}
    {pageData.map(subcategory => (
        <option key={subcategory.id} value={subcategory.subPage}>{subcategory.subPage}</option>
    ))}
</select>
                            {errors['page'] && <div className="invalid-feedback">{errors['page']}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="heading">Heading:</label>
                            <input
                                type="text"
                                id="heading"
                                className="form-control"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subHeading">Sub Heading:</label>
                            <input
                                type="text"
                                id="subHeading"
                                className="form-control"
                                value={subHeading}
                                onChange={(e) => setSubHeading(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contents">Contents:</label>
                            <textarea
                                id="contents"
                                className="form-control"
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image:</label>
                            <input
                                type="text"
                                id="image"
                                className="form-control"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ContentSection;