import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './flaticons.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './responsive.css';
import './Style.css';
import './flaticons.css';
import 'owl.carousel/dist/owl.carousel.min.js';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

// import $ from 'jquery';
import 'owl.carousel';  

import './Counter.css'
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';

const Ourteam = () => 
{
  
  return (
    <>    

    <Navbar/>
    <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Our Team</h2>
                            <ul className="breadcrumb-menu list-style">
                            <li><Link to="/">Home</Link></li>
                                <li>Our Team</li>
                            </ul>
                        </div>
                    </div>
                </div>
               
                <section className="story-section ptb-100" style={{ paddingBottom: '0px' }}>
            <div className="container">

                {/* Managing Director Section */}
                <div className="story-block">
                    <div className="pattern-layer" style={{ backgroundImage: "url(https://seduloussoftech.com/PMCH/assets/img/pattern-3.png)" }}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                        <img src="https://seduloussoftech.com/PMCH/assets/img/director.png" alt="Managing Director" />
                                        <div className="box-wrapper p-b50">
                                            <h2 className="font_32 fontW_600">Managing Director</h2>
                                            <h3 className="sub-title">Cdr. (Retd.) Shashank Shekhar</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>It has been documented many a times as policy statements &amp; still more has been taught in classes, workshops about comprehensive healthcare concepts, yet a majority of Indian population is deprived of an efficient comprehensive healthcare delivery system.</p>
                                        <p>Though the socio economic status of the country at large &amp; also that of under developed states are on the rise and major investment in healthcare industry is expected in the coming years yet the resource will remain constraint to allow benefits of comprehensive healthcare concepts &amp; advanced technology based medical care to masses. Optimization of resources to provide the needed health &amp; medical care to the needy people is the task of professional hospital &amp; healthcare professionals.</p>
                                        <p>This need of professional trained manpower demand dedicated training centres in different part of country &amp; its legitimate acceptance by medical fraternity &amp; the society at large.</p>
                                        <p>Keeping in mind the above, Prashant Memorial Charitable Hospital &amp; taken an initiative to establish Prashant Nursing Training School further to impart quality education &amp; training.</p>
                                        <p>I pray to almighty GOD to gives us strength &amp; wisdom to make our institute not only successful &amp; to achieve our vision of developing competent healthcare professionals.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chairperson Section */}
                <div className="story-block-two">
                    <div className="pattern-layer" style={{ backgroundImage: "url(https://seduloussoftech.com/PMCH/assets/img/pattern-3.png)" }}></div>
                    <div className="inner-box">
                        <div className="clearfix">
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                        <img src="https://seduloussoftech.com/PMCH/assets/img/chairperson.png" alt="Chairperson" />
                                        <div className="box-wrapper p-b50">
                                            <h2 className="font_32 fontW_600">Chairperson</h2>
                                            <h3 className="sub-title">Dr. Moti Sinha</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="text">
                                        <p>Both public &amp; private sectors throughout the developing world are consistently involved in improving health services. In spite of vastly improved technology &amp; communication facility, delivery of healthcare by these systems to communities remain a labour-intensive process. Eventually, trained manpower remains the critical component in the delivery of health services.</p>
                                        <p>Realizing the fact, PRASHANT NURSING TRAINING SCHOOL are going to make a beginning in the state of Bihar by imparting quality teaching &amp; training for nurses.</p>
                                        <p>Prashant Nursing Training School (PNTS) will focus to improve the quality of training to Nurses &amp; involve in activities so as to facelift the healthcare delivery system of the state.</p>
                                        <p>Our motto will be to give knowledge, best training environment, and confidence to our students so that final objective of becoming a good professional &amp; clinching job is met.</p>
                                        <p>I wish good luck to the institute and to the candidates taking benefit of it.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



             

            
            </div>

      <BackToTopButton/>

            <Footer />


        
    



       


    
                    </>
  );
};

export default Ourteam;