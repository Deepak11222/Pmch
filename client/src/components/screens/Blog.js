import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';
import axios from 'axios';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [pageTitle, setPageTitle] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        message: '',
        saveInfo: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get('/api/auth/blog'); // Adjust the API endpoint as per your backend route
                const blogsData = response.data;
                
                // Assuming the image data is returned as base64-encoded string in the 'image' field of each blog object
                const blogsWithImages = blogsData.map(blog => ({
                    ...blog,
                    image: `data:image/png;base64,${blog.image}` // Adjust the format if the image format is different
                }));
                
                setBlogs(blogsWithImages);
                
                if (blogsWithImages.length > 0) {
                    setPageTitle(blogsWithImages[0].title);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to fetch blogs');
            }
        };

        fetchBlogData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Revolutionizing Healthcare Our Commitment Patient Centered Multi Specialty Care</h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/">News</Link></li>
                                <li><Link to="/blogs">Revolutionizing Healthcare Our Commitment Patient Centered Multi Specialty Care
</Link></li>
                                {/* <li>{pageTitle}</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="blog-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                        {blogs.map(blog => (
    <div key={blog._id} className="col-xl-12 col-lg-12">
        <article>
            <div className="post-img">
                <img src={blog.image} alt={blog.blogtitle} />
            </div>
            <ul className="post-metainfo list-style">
                <li><i className="ri-user-unfollow-line"></i><a href="posts-by-author.html">Admin</a></li>
                <li><i className="ri-wechat-line"></i>No Comment</li>
            </ul>
            <h1>{blog.blogtitle}</h1>
            <div className="post-para" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
        <div id="cmt-form">
            <div className="comment-box-title mb-25">
                <h4>Leave A Comment</h4>
                <p>Your email address will not be published. Required fields are marked.</p>
            </div>
            <form onSubmit={handleSubmit} className="comment-form">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Name*"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Email Address*"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input
                                type="url"
                                name="website"
                                id="website"
                                placeholder="Website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <textarea
                                name="message"
                                id="message"
                                cols="30"
                                rows="10"
                                placeholder="Please Enter Your Comment Here"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <div className="form-check checkbox">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="saveInfo"
                                name="saveInfo"
                                checked={formData.saveInfo}
                                onChange={(e) => setFormData({ ...formData, saveInfo: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="saveInfo">
                                Save my info for the next time I comment.
                            </label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn style1">
                            Post A Comment
                        </button>
                    </div>
                </div>
            </form>
        </div>

    </div>
))}

                        </div>
                    </div>
                </div>
            </div>
            <BackToTopButton />
            <Footer />
        </>
    );
}

export default Blog;
