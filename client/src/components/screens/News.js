import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';
import axios from 'axios';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

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
                            <h2>News</h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li>News</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="blog-wrap ptb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            {blogs.map(blog => (
                                <div key={blog._id} className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="blog-card style2">
                                        <div className="blog-img">
                                            <a href="#">
                                                <img src={blog.image} alt={blog.title} />
                                            </a>
                                        </div>
                                        <div className="blog-info">
                                            <h3><a href="#">{blog.blogtitle}</a></h3>
                                            <p><a href="#">{blog.shortdiscription}</a></p>
                                            {/* <p className="descs">{blog.content}</p> */}
                                            <Link to="/blog" className="link style2">Read More<FaArrowRight /></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <BackToTopButton />
            <Footer />
        </>
    );
}

export default Blog;