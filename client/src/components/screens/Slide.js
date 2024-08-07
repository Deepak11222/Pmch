import React, { useEffect } from 'react';
import { SlBadge } from "react-icons/sl";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
// import './Counter.css';
// import './flaticons.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './responsive.css';
import './Style.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import 'owl.carousel/dist/owl.carousel.min.js';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './Style.css';
import './responsive.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import aboutimg6 from '../imgs/aboutimg6.jpg'
import aboutimg7 from '../imgs/aboutimg7.jpg';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  useEffect(() => {
    const $ = window.$; // Accessing jQuery from window object
    $('.hero-slider-three').owlCarousel({
        // dots: false,
        // nav: true,
        // navText: [`<i class="ri-arrow-left-s-line"></i>`, `<i class="ri-arrow-right-s-line"></i>`],
        // responsive: {
        //     0: {
        //         items: 1
        //     },
        //     768: {
        //         items: 2
        //     },
        //     1024: {
        //         items: 3
        //     }
        // }
    });
}, []);
    return (
      <>
                           <section className="hero-wrap style6">
            <OwlCarousel className="hero-slider-three owl-carousel owl-loaded owl-drag"
                items={1}
                loop
                // autoplay
                // autoplayTimeout={5000}
                // nav
                // dots={false}
            >
                <div className="hero-slide-item bg-one bg-f">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="hero-content" data-speed="0.10" data-revert="true">
                                    <h1>Prashant Memorial Charitable Hospital</h1>
                                    <p>Prashant Memorial Charitable Hospital is a modern, world class multi-speciality hospital offering 150-bedded comprehensive medical facilities in Muzaffarpur, Bihar, India.</p>                                    {/* <div className="hero-btn">
                                    <a href="#" class="btn style1" style={{width:'auto'}}>Find Out More</a>
                                        <a className="play-video" data-fancybox="" href="#">
                                            <span className="video-icon">
                                                <i className="ri-play-fill"></i>
                                            </span>
                                           <span> Watch Video</span>
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* You can add more slides here */}
            </OwlCarousel>
        </section>




<section className="about-wrap style3 ptb-100 bg-athens">
<div className="container">
    <div className="row gx-5 align-items-center">
        <div className="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            <div className="about-img-wrap">
                <img src={aboutimg6} alt="Image" className="about-img-one" />
                <img src={aboutimg7} alt="Image" className="about-img-two" />
                <div className="about-promo-box">
                    <span className="promo-icon" style={{color:"white", fontSize:45}}><SlBadge />
</span>
                    <h2>500+ <span>Awards We Won</span></h2>
                </div>
            </div>
        </div>
        <div className="col-lg-6 aos-init" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            <div className="about-content">
                <div className="content-title style1">
                    <span>About Us</span>
                    <a href="https://nabh.co/" target="_blank">
    <h2>North Bihar NABH Accredited Hospital</h2>
</a>
<p>Prashant Memorial Charitable Hospital was established in 2002 by Dr. Moti Sinha, who served Bihar Govt. Health Services for 32 years, retiring as an associate professor in the OBS &amp; GYNEAC Department at SK Medical College, Muzaffarpur, Bihar. Dr. Sinha, an esteemed gynecologist and professor, devoted her life's work to this cause, honoring the memory of her son, Dr. Prashant Priya Ranjan.</p>
<p>With years of experience, we have been committed to our mission and aspire to continue our efforts with even greater efficiency. We humbly request your collaboration, recognizing that healthcare is paramount in life. Your cooperation is essential for us to deliver the highest quality care and make a meaningful impact on the well-being of our community. Let us seize this opportunity together to embrace and support the invaluable services we provide for your health and betterment.</p>
                </div>
                {/* <div className="feature-item-wrap">
                    <div className="feature-item">
                        <div className="feature-icon">
                        <img src={require('../imgs/heart-rate.png').default} style={{color:'blue', width:28, marginLeft:18}} className="flaticon-admision-form"></img>
                        </div>
                        <div className="feature-text">
                            <h3>Good People Work</h3>
                            <p>Vestibulum ac diam sit amet quam vehicula elemen tum sed sit amet dui praesent sapien pellen tesque .</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                        <img src={require('../imgs/drugs.png').default} style={{color:'blue', width:25, marginLeft:18}} className="flaticon-admision-form"></img>
                        </div>
                        <div className="feature-text">
                            <h3>Live Healthy Life</h3>
                            <p>Vestibulum ac diam sit amet quam vehicula elemen tum sed sit amet dui praesent sapien pellen tesque.</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
</div>
</section>
      </>


        

        
    );
};

export default HeroSlider;
