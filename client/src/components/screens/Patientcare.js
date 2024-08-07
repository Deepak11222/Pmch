import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import './flaticons.css';
import './Style.css';
import './responsive.css';
import './aos.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './flaticons.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'aos/dist/aos.css';
import './responsive.css';
import './Style.css';
import './flaticons.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/owl.carousel.min.js';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';

const Patientcare = () => {
    return (
        <>
            <Navbar />

            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Patient Care</h2>
                            <ul className="breadcrumb-menu list-style">
                            <li><Link to="/">Home</Link></li>
                                <li>Patient Care</li>
                            </ul>
                        </div>
                    </div>
                </div>
            <section className="story-section ptb-100" style={{ paddingBottom: '0px' }}>
            <div className="container">

                {/* Introduction */}
                <div className="story-block">
                    <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    <img src={require('../imgs/about-02.jpg').default}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50">
                                    <h3 className="sub-title">Introduction</h3>
                                    <h2 className="font_32 fontW_600">Patient Care at Prashant Memorial Charitable Hospital</h2>
                                </div>
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>Prashant Memorial Charitable Hospital is a healthcare leader in North Bihar, combining advanced medical technology with patient-first care. Our mission is straightforward: to deliver the highest standard of medical treatment in a setting that prioritizes your comfort and well-being.</p>
                                        <p>Our legacy is built on a commitment to innovation in medical care and community health advancement. We offer comprehensive services across various specialties, focused on achieving the best possible health outcomes for our patients.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="story-block-two">
                    
                <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    {/* src={require('../imgs/24_hours.png').default */}
                  <img src={require('../imgs/about-02.jpg').default}></img>
                  </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50 text_align_right">
                                    <h3 className="sub-title">&nbsp;</h3>
                                    <h2 className="font_32 fontW_600">Core Values</h2>
                                </div>
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>We are dedicated to providing healthcare that is ethical, effective, and patient-focused. At Prashant Hospital, you will find an environment designed for healing and staff committed to your care. Our modern infrastructure is designed to support a wide range of medical services, ensuring that we meet your healthcare needs with the highest quality standards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expertise */}
                <div className="story-block">
                <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    <img src={require('../imgs/about-02.jpg').default}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50">
                                    <h3 className="sub-title">&nbsp;</h3>
                                    <h2 className="font_32 fontW_600">Expertise</h2>
                                </div>
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>Our expertise spans across multiple medical specialties, providing both general and complex treatments. Our team, comprising some of the finest medical professionals, works tirelessly to ensure that your health concerns are addressed promptly and effectively, leading to faster recovery and reduced financial strain.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Infrastructure */}
                <div className="story-block-two">
                <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    <img src={require('../imgs/about-02.jpg').default}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50 text_align_right">
                                    <h3 className="sub-title">&nbsp;</h3>
                                    <h2 className="font_32 fontW_600">Infrastructure</h2>
                                </div>
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>Our hospital infrastructure is at the cutting edge, offering a full range of diagnostic and treatment services under one roof. We've designed our spaces to enhance patient comfort and enable our staff to deliver care efficiently.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Department */}
                <div className="story-block">
                <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    <img src={require('../imgs/about-02.jpg').default}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50">
                                    <h3 className="sub-title">&nbsp;</h3>
                                    <h2 className="font_32 fontW_600">Department</h2>
                                </div>
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>With a comprehensive range of departments, Prashant Hospital addresses all aspects of health and wellness. Our Centers of Excellence are staffed by specialists who deliver top-tier medical care. From pediatric needs to emergency responses, we are prepared to handle health challenges with expertise and compassion.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Facilities */}
                <div className="story-block-two">
                <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    <img src={require('../imgs/about-02.jpg').default}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50 text_align_right">
                                    <h3 className="sub-title">&nbsp;</h3>
                                    <h2 className="font_32 fontW_600">Facilities</h2>
                                </div>
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>We offer advanced medical facilities for diagnosis and treatment, ensuring that every patient receives the care they need. Our services are designed to support your health journey, with a suite of options tailored to the unique needs of every age group and health condition.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Healthcare Staff */}
                <div className="story-block">
                <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    <img src={require('../imgs/about-02.jpg').default}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50">
                                    <h3 className="sub-title">&nbsp;</h3>
                                    <h2 className="font_32 fontW_600">Healthcare Staff</h2>
                                </div>
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>The backbone of our hospital is our knowledgeable and dedicated healthcare staff. They bring a blend of clinical expertise and a passion for patient care, creating an environment where health and healing are paramount.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conclusion */}
                <div className="story-block-two">
                <div className="pattern-layer" src={require('../imgs/pattern-3.png').default}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                    <img src={require('../imgs/about-02.jpg').default}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="box-wrapper p-b50 text_align_right">
                                    <h3 className="sub-title">&nbsp;</h3>
                                    <h2 className="font_32 fontW_600">Conclusion</h2>
                                </div>
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>At Prashant Memorial Charitable Hospital, we're more than just a hospital—we're a partner in your health journey. With our patient-centered approach, cutting-edge treatments, and a deep commitment to the communities we serve, we're setting new standards in accessible and effective healthcare.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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


      <BackToTopButton/>

            <Footer />
        </>
    );
}

export default Patientcare;