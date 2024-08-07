import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';

const About = () => {
    const [pageTitle, setPageTitle] = useState('');
    const [aboutData, setAboutData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAboutData();
    }, []);

    const fetchAboutData = async () => {
        try {
            const response = await axios.get('/api/auth/about');
            const aboutData = response.data;

            // Convert image data to base64 format
            const aboutDataWithImages = aboutData.map(data => ({
                ...data,
                image: `data:image/png;base64,${data.image}`
            }));

            setAboutData(aboutDataWithImages);
            setPageTitle(aboutData[0].title); // Set the page title
        } catch (error) {
            console.error('Error fetching about data:', error);
            setError('Failed to fetch about data');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!aboutData.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2 dangerouslySetInnerHTML={{ __html: pageTitle }}></h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/services">Specialties</Link></li>
                                <li dangerouslySetInnerHTML={{ __html: pageTitle }}></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Display about data */}
                <section className="about-wrap style1 ptb-100">
                    {aboutData.map((data, index) => (
                        <div key={index} className="container">
                            <div className="row gx-5 align-items-center">
                                <div className="col-lg-6">
                                    <div className="about-img-wrap" style={{ paddingBottom: "0px" }}>
                                        <img src={data.image} alt="" className="about-img-one_1" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-content">
                                        <div className="content-title style1">
                                            <span>{data.heading}</span>
                                            <h2>{data.title}</h2>
                                            <p dangerouslySetInnerHTML={{ __html: data.content }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            <section className="bg-athens ptb-100">
            <div className="container">
                <div className="section-title style1 text-center mb-40">
                    <span>Vision Mission</span>
                    <h2>Care For Patients</h2>
                    <br />
                    <img src="https://seduloussoftech.com/PMCH/assets/img/vision.png" alt="Vision" />
                </div>
                <div className="service-desc">
                    <h3><strong>Mission</strong></h3>
                    <p>Preserve health, enhance longevity and mitigate health problems by fully equipped highest quality, comprehensive and most affordable health care organization, delivered with kindness, vision and integrity.</p>
                    <h3><strong>Vision</strong></h3>
                    <p>Delivery excellent medical facilities and compassionate care to all</p>
                </div>
            </div>
        </section>
            <Footer />
            <BackToTopButton />
        </>
    );
}

export default About;