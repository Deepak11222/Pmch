import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';
import axios from 'axios';

const AboutComponent = ({ pageData }) => (
    <>
        <Navbar />
        <div className="content-wrapper">
            <div className="breadcrumb-wrap bg-f br-2">
                <div className="container">
                    <div className="breadcrumb-title">
                        <h2>About Us</h2>
                        <ul className="breadcrumb-menu list-style">
                            <li><Link to="/">Home</Link></li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="about-wrap style1 ptb-100">
                <div className="container">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="about-img-wrap" style={{ paddingBottom: "0px" }}>
                                <img src={require('../imgs/about-img-1.jpg').default} alt="Image" className="about-img-one_1" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content">
                                <div className="content-title style1">
                                    <span>{pageData.title}</span>
                                    <h2 dangerouslySetInnerHTML={{ __html: pageData.heading }} />
                                    <p dangerouslySetInnerHTML={{ __html: pageData.content }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                                                {/* Static content */}
                                                <section className="bg-athens ptb-100">
                                        <div className="container">
                                            <div className="section-title style1 text-center mb-40">
                                                <span>Vision Mission</span>
                                                <h2>Care For Patients</h2>
                                                <br />
                                                <img src={require('../imgs/vision.png').default} alt="Image" className="about-img-one_1" />
                                            </div>
                                            <div className="service-desc">
                                                <h3><strong>Mission </strong></h3>
                                                <p>Preserve health, enhance longevity and mitigate health problems by fully equipped highest quality, comprehensive and most affordable health care organization, delivered with kindness, vision and integrity.</p>
                                                <h3><strong>Vision</strong></h3>
                                                <p>Delivery excellent medical facilities and compassionate care to all</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="emergency-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="emergency-content">
                  <h2>Get an Appointment at <b>Prashant Hospital</b></h2>
                  <p>We are always at your side. We are 24 hours available for you in an emergency situation.</p>
                  <div className="emergency-icon-content">
                  <img src={require('../imgs/24_hours.png').default}></img>
                                      {/* <img src="../imgs/24_hours.png" alt="Images" /> */}
                    <h3><a href="tel:+91-18003457777">+91 - 18003457777</a></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="emergency-shape">
          <img src={require('../imgs/emergency-shape.png').default}></img>
          </div>
        </div>

        {/* </div> */}
        <Footer />
        <BackToTopButton />
    </>
);

const SpecialtiesComponent = ({ pageData, specialties }) => {
    const generateSlug = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2 dangerouslySetInnerHTML={{ __html: pageData.title }}></h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/services">Specialties</Link></li>
                                <li dangerouslySetInnerHTML={{ __html: pageData.title }}></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Service details section */}
                <section className="service-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                            {/* Page data */}
                            <div className="col-xl-8">
                                <article>
                                    <div className="post-img">
                                        <div className="row">
                                            <h2 dangerouslySetInnerHTML={{ __html: pageData.title }}></h2>
                                            <div className="col-md-6">
                                                <a className="single-service-img" data-fancybox="gallery" href={pageData.image1}>
                                                    <img src={pageData.image1} alt={pageData.title} />
                                                </a>
                                            </div>
                                            <div className="col-md-6">
                                                <a className="single-service-img" data-fancybox="gallery" href={pageData.image2}>
                                                    <img src={pageData.image2} alt={pageData.title} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-para" dangerouslySetInnerHTML={{ __html: pageData.content }} />
                                </article>
                            </div>

                            {/* Sidebar */}
                            <div className="col-xl-4">
                                <div className="sidebar bg-white">
                                    <div className="sidebar-widget categories">
                                        <h4>Top Services</h4>
                                        <div className="category-box">
                                            <ul className="list-style">
                                                {specialties.map((specialty, index) => (
                                                    <li key={index}>
                                                                            {/* <Link to={`/page/${generateSlug(specialtie.title)}`}> */}

                                                        <Link to={`/page/${generateSlug(specialty.title)}`}>
                                                            {specialty.title}
                                                        </Link>
                                                    </li>
                                                ))}
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
                                    {/* Other sidebar widgets */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="emergency-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="emergency-content">
                  <h2>Get an Appointment at <b>Prashant Hospital</b></h2>
                  <p>We are always at your side. We are 24 hours available for you in an emergency situation.</p>
                  <div className="emergency-icon-content">
                  <img src={require('../imgs/24_hours.png').default}></img>
                                      {/* <img src="../imgs/24_hours.png" alt="Images" /> */}
                    <h3><a href="tel:+91-18003457777">+91 - 18003457777</a></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="emergency-shape">
          <img src={require('../imgs/emergency-shape.png').default}></img>
          </div>
        </div>


                {/* Emergency area */}
                {/* Include emergency area here */}
            </div>
            <Footer />
            <BackToTopButton />
        </>
    );
};



const SinglePage = () => {
    const { slug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await axios.get(`/api/auth/page/${slug}`);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                const pageData = response.data.pageData;

                // Update image URLs to include base64 data
                const updatedPageData = {
                    ...pageData,
                    image1: `data:image/png;base64,${pageData.image1}`,
                    image2: `data:image/png;base64,${pageData.image2}`
                };

                setPageData(updatedPageData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching page data:', error);
                setError('Failed to fetch page data');
                setLoading(false);
            }
        };

        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('/api/auth/specialties');
                const specialtiesData = response.data;

                // Assuming the image data is returned as base64-encoded string in the 'image' field of each specialties object
                const specialtiesWithImages = specialtiesData.map(specialty => ({
                    ...specialty,
                    image: `data:image/png;base64,${specialty.image}` // Adjust the format if the image format is different
                }));

                setSpecialties(specialtiesWithImages);
            } catch (error) {
                console.error('Error fetching specialties:', error);
                setError('Failed to fetch specialties');
            }
        };

        fetchPageData();
        fetchSpecialties();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pageData) {
        return <div>Page data not found</div>;
    }

    // Render About component if slug is 'about'
    if (slug === 'about') {
        return <AboutComponent pageData={pageData} />;
    }

    // Redirect to '/our-team' if slug is 'our-team'
    if (slug === 'our-team') {
        return <Redirect to="/our-team" />;
    }

    // Render Specialties component for other slugs
    return <SpecialtiesComponent pageData={pageData} specialties={specialties} />;
}

export default SinglePage;