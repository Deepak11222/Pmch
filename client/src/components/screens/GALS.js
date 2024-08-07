import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';
import axios from 'axios';

const Gals = () => {
    const [galsData, setGalsData] = useState(null);
    const [error, setError] = useState(null);
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        const fetchGalsData = async () => {
            try {
                const response = await axios.get('/api/auth/gals'); // Adjust the API endpoint as per your backend route
                const galsData = response.data;

                const galsDataWithImages = galsData.map(data => ({
                    ...data,
                    image1: `data:image/png;base64,${data.image1}`,
                    image2: `data:image/png;base64,${data.image2}`
                }));

                setGalsData(galsDataWithImages);

                if (galsDataWithImages.length > 0) {
                    setPageTitle(galsDataWithImages[0].title);
                }
            } catch (error) {
                console.error('Error fetching gals data:', error);
                setError('Failed to fetch gals data');
            }
        };

        fetchGalsData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!galsData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                {/* Breadcrumb section */}
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

                {/* Service details section */}
                <section className="service-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                            {/* Gals data */}
                            {galsData.map((data, index) => (
                                <div key={index} className="col-xl-8">
                                    <article>
                                        <div className="post-img">
                                            <div className="row">
                                                <h2 dangerouslySetInnerHTML={{ __html: pageTitle }}></h2>
                                                <div className="col-md-6">
                                                    <a className="single-service-img" data-fancybox="gallery" href={data.image1}>
                                                        <img src={data.image1} alt={data.title} />
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a className="single-service-img" data-fancybox="gallery" href={data.image2}>
                                                        <img src={data.image2} alt={data.title} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-para" dangerouslySetInnerHTML={{ __html: data.content }} />
                                    </article>
                                </div>
                            ))}

                            {/* Sidebar */}
                            <div className="col-xl-4">
                                <div className="sidebar bg-white">
                                    {/* <div class="sidebar-widget">
                                        <div class="search-box">
                                            <div class="form-group">
                                                <input type="search" placeholder="Search" />
                                                <button type="submit">
                                                    <i class="ri-search-2-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="sidebar-widget categories">
                                        <h4>Top Services</h4>
                                        <div className="category-box">
                                            <ul className="list-style">
                                                <li>
                                                    <Link to="service-one.html">
                                                    Cardiology Department
                                                                                                  </Link>
                                                </li>
                                                <li>
                                                    <Link to="service-one.html">
                                                    Nutrition Department
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="service-one.html">
                                                    Dental Department
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link to="service-one.html">
                                                    ENT Department
                                                    </Link>
                                                </li>
                                                <li>
                        <Link to="#">Gynaecology and Obstetrics</Link>
                    </li>
                    <li>
                        <Link to="#">General and Laparoscopic Surgery</Link>
                    </li>
                    <li>
                        <Link to="#">Maxillofacial Surgery</Link>
                    </li>
                    <li>
                        <Link to="#">Neonatal and Pediatric Clinic</Link>
                    </li>
                    <li>
                        <Link to="#">Nephrology</Link>
                    </li>
                    <li>
                        <Link to="#">Orthopedics</Link>
                    </li>
                    <li>
                        <Link to="#">Opthalmology</Link>
                    </li>
                    <li>
                        <Link to="#">Physiotherapy</Link>
                    </li>
                    <li>
                        <Link to="#">Urology Department</Link>
                    </li>
                    <li>
                        <Link to="service-one.html">
                            Orthopedic Solutions 
                        </Link>
                    </li>
                    <li>
                        <Link to="service-one.html">
                            Cardiology Solutions
                        </Link>
                    </li>
                    <li>
                        <Link to="service-one.html">
                            Dental Services
                        </Link>
                    </li>
                    <li>
                        <Link to="service-one.html">
                            Eye Care Services
                        </Link>
                    </li>
                    <li>
                        <Link to="service-one.html">
                            Gastrology Services
                        </Link>
                    </li>
                    <li>
                        <Link to="service-one.html">
                            Neurology Services
                        </Link>
                    </li>
                         
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget">
                                        <h4>Contact us</h4>
                                        <form action="#" className="contact-widget">
                                            <div className="form-group">
                                                <input type="text" placeholder="Name" />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <textarea name="msg" id="msg" cols="30" rows="10" placeholder="Your Message"></textarea>
                                            </div>
                                            <button type="submit" className="btn style1 w-100 d-block">Send Now</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Emergency area */}
                <div className="emergency-area ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="emergency-content">
                                    <h2>Get an Appointment at <b>Prashant Hospital</b></h2>
                                    <p>We are always at your side. We are 24 hours available for you in emergency situation.</p>
                                    <div className="emergency-icon-content">
                                        <img src="https://seduloussoftech.com/PMCH/assets/img/24_hours.png" alt="Images"/>
                                        <h3><a href="tel:+91-18003457777">+91 - 18003457777</a></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="emergency-shape">
                        <img src="https://seduloussoftech.com/PMCH/assets/img/emergency-shape.png" alt="Images"/>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
            
            {/* Back to top button */}
            <BackToTopButton />
        </>
    );
}

export default Gals;