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

const FAQ = () => {
    // const services = [
    //     {
    //         imageSrc: "assets/img/services/service-4.jpg",
    //         imageAlt: "Image",
    //         iconClass: "flaticon-traumatology",
    //         title: "Orthopedic Solution",
    //         description: "It is a long established fact that reader will content of page when looks layout.",
    //         link: "service-details.html"
    //     },
    //     {
    //         imageSrc: "assets/img/services/service-5.jpg",
    //         imageAlt: "Image",
    //         iconClass: "flaticon-bandage",
    //         title: "Pathology test",
    //         description: "It is a long established fact that reader will content of page when looks layout.",
    //         link: "service-details.html"
    //     },
    //     // Add more services as needed
    // ];

    const options = {
        loop: true,
        margin: 25,
        responsiveClass: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    };

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>FAQ</h2>
                            <ul className="breadcrumb-menu list-style">
                            <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/services">Services</Link></li> */}
                                <li>FAQ</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="faq-wrap ptb-100">
      <div className="container">
        <div className="row gx-5 align-items-center">
          <div className="col-lg-6">
            <div className="faq-img-wrap">
            {/* <img src={require('../imgs/service2.jpg').default} alt="Service 1" /> */}

              <img src={require('../imgs/faq-shape.png').default} alt="Image" className="faq-shape bounce" />
              <img src={require('../imgs/faq-img-1.jpg').default} alt="Image" className="faq-img-one" />
              <img src={require('../imgs/faq-img-2.jpg').default} alt="Image" className="faq-img-two" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="faq-content">
              <div className="content-title style1 mb-40">
                <span>FAQ</span>
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne" style={{border:"none"}}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <span>
                            <i className="ri-add-circle-line plus"></i>
                            <i className="ri-indeterminate-circle-line minus"></i>
                        </span>
                        Is A Phonecall Considered Telemedicine
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <div className="single-product-text">
                            <p>Lorem ipsum dolor sit amet consec tetur adipisicing elit. Quisquam sit laborum est aliquam. Dicta fuga soluta eius exercitationem porro modi. Exercitationem eveniet aliquam repudiandae non, sequi mollitia at iusto</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span>
                            <i className="ri-add-circle-line plus"></i>
                            <i className="ri-indeterminate-circle-line minus"></i>
                        </span>
                        What Equipment Do You Need For Telemedicine?
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>Lorem ipsum dolor sit amet consec tetur adipisicing elit. Quisquam sit laborum est aliquam. Dicta fuga soluta eius exercitationem porro modi. Exercitationem eveniet aliquam repudiandae non, sequi mollitia at iusto</p>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <span>
                            <i className="ri-add-circle-line plus"></i>
                            <i className="ri-indeterminate-circle-line minus"></i>
                        </span>
                        Can We Use Facetime For Telemedicine?
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>Lorem ipsum dolor sit amet consec tetur adipisicing elit. Quisquam sit laborum est aliquam. Dicta fuga soluta eius exercitationem porro modi. Exercitationem eveniet aliquam repudiandae non, sequi mollitia at iusto</p>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingfour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                        <span>
                            <i className="ri-add-circle-line plus"></i>
                            <i className="ri-indeterminate-circle-line minus"></i>
                        </span>
                        How Do I Start Telemedicine?
                    </button>
                </h2>
                <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <div className="single-product-text">
                            <p>Lorem ipsum dolor sit amet consec tetur adipisicing elit. Quisquam sit laborum est aliquam. Dicta fuga soluta eius exercitationem porro modi. Exercitationem eveniet aliquam repudiandae non, sequi mollitia at iusto</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            </div>
          </div>
        </div>
      </div>
    </div>

            
            </div>

      <BackToTopButton/>

            <Footer />
        </>
    );
}

export default FAQ;