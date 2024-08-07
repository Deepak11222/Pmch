import React from 'react';
import { Link } from 'react-router-dom';
import './responsive.css';
import './Style.css';
import './flaticons.css';
import 'remixicon/fonts/remixicon.css';


const Footer = () => {
  return (
<footer className="footer-wrap">
                <div className="container" style={{background:" #14467B"}}>
                    <div className="row pt-100 pb-75">
                        <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12">
                            <div className="footer-widget">
                                <Link to="index.html" className="footer-logo">
                                    <img src={require('../imgs/footerlogo.jpg').default} alt="Image"/>
                                </Link>
                                <p className="comp-desc">
                                Our focus is on your overall wellbeing and helping you achieve optimal health and aesthetics.</p>
                                <ul className="social-profile style1 list-style">
                                    <li>
                                        <Link to="https://facebook.com">
                                            <i className="ri-facebook-fill"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://twitter.com">
                                            <i className="ri-twitter-fill"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://instagram.com">
                                            <i className="ri-instagram-line"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://linkedin.com">
                                            <i className="ri-linkedin-fill"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h3 className="footer-widget-title">Company</h3>
                                <ul className="footer-menu list-style">
                                    <li>
                                        <Link to="/">
                                            <i className="ri-arrow-right-s-line"></i>
                                           Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/page/about">
                                            <i className="ri-arrow-right-s-line"></i>
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/page/our-team">
                                            <i className="ri-arrow-right-s-line"></i>
                                          Our Team
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/media">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Media Gallery
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact-us">
                                            <i className="ri-arrow-right-s-line"></i>
                                           Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6">
                            <div className="footer-widget">
                                <h3 className="footer-widget-title">Our Specialities</h3>
                                <ul className="footer-menu list-style">
                                    <li>
                                        <Link to="/page/cardiology-department">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Cardiology
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/page/medicine">
                                            <i className="ri-arrow-right-s-line"></i>
                                            General Medicine
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/page/orthopedics">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Orthopedics 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/page/gynaecology-and-obstetrics">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Gynaecology
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/specialties">
                                            <i className="ri-arrow-right-s-line"></i>
                                            View More
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-5 col-md-6 col-sm-6 pe-xl-4">
                            <div className="footer-widget">
                                <h3 className="footer-widget-title">Quick Link</h3>
                                <ul className="footer-menu list-style">
                                




                                    <li>
                                        <Link to="#">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Blogs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Appointment
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="ri-arrow-right-s-line"></i>
                                            TPA &amp; Insurance
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Patient Guide
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="ri-arrow-right-s-line"></i>
                                            Facilities
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-7 col-md-6 col-sm-6">
          <div className="footer-widget">
            <h3 className="footer-widget-title">Official Info</h3>
            <ul className="contact-info list-style">
                                    <li>
                                    <i className="ri-map-pin-line" style={{ verticalAlign: 'middle', marginRight: '8px' }}></i>
                                        <h6>Location</h6>
                                        <p>Prashant Memorial Charitable Hospital, Juran Chapra Road No 4 Muzaffarpur, Bihar, 842001</p>
                                    </li>
                                    <li>
                <i className="ri-phone-line" style={{ verticalAlign: 'middle', marginRight: '8px' }}></i>
                                        <h6>Phone</h6>
                                        <Link to="tel:13454567877">+91-18003457777</Link>
                                    </li>
                                </ul>
          </div>
        </div>
        {/* ... Rest of your content ... */}
      </div>
      </div>

      <p className="copyright-text"><i className="ri-copyright-line"></i> <span> 2024 Prashant Memorial Charitable Hospital. All Rights Reserved </span>. Designed and Developed by <Link to="http://seduloussoftech.com/" target="_blank">Sedulous Softtech</Link></p>            </footer>
  );
};

export default Footer;
