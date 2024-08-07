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

const Orthopedics = () => {
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
                            <h2>Orthopedics</h2>
                            <ul className="breadcrumb-menu list-style">
                            <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Specialties</Link></li>
                                <li>Orthopedics</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="service-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                            <div className="col-xl-8">
                                <div className="service-desc">
                                    <h2>Orthopedics</h2>
                                    <p>Did you know? Every year, approximately 14% of Indians seek medical treatment for joint and musculoskeletal conditions. Generally, a musculoskeletal condition happens due to aging, a fall, an accident, or a sports injury. Arthritis is now the most common orthopedic disorder. So, patients in every state and city of the country, including Bihar, who are suffering from severe orthopedic conditions need to be treated at the best orthopedic hospital in Muzaffarpur.</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Link className="single-service-img" data-fancybox="gallery" to="assets/img/services/single-service-1.jpg">
                                                <img src={require('../imgs/single-service-1.jpg').default}></img>
                                            </Link>
                                        </div>
                                        <div className="col-md-6">
                                            <Link className="single-service-img" data-fancybox="gallery" to="assets/img/services/single-service-2.jpg">
                                                <img src={require('../imgs/single-service-2.jpg').default}></img>
                                            </Link>
                                        </div>
                                    </div>
                                    <h3>The most common orthopedic problems for which people visit Big Apollo Spectra Hospital are:</h3>
                                    <ol>
                                        <li>Fracture or broken bones</li>
                                        <li>Sports injuries with ligament, muscle, and tendon tears</li>
                                        <li>Spine and nerve problems</li>
                                        <li>Joint dislocation</li>
                                    </ol>
                                    <p><strong>It can affect any joint, like the hip, shoulder, or spine, but knee is the most common in India</strong></p>
                                    <h3>Causes and Risk:</h3>

                                    <ol>
                                        <li>Family History</li>
                                        <li>Immune system problems</li>
                                        <li>Lack of adequate exercise</li>
                                        <li>Accidental Issues </li>
                                        <li>Overweight and obesity</li>
                                        <li>Old Age</li>
                                    </ol>

                                    <h3>Symptoms</h3>

                                    <p>Some Symptoms of Orthopedic Diseases:</p>

                                    <ol>
                                        <li>Swelling</li>
                                        <li>Pain</li>
                                        <li>Warmth</li>
                                        <li>Redness</li>
                                        <li>Tenderness</li>
                                    </ol>

                                    <h3>Best treatment</h3>
                                    <p>There are some short-term and long-term treatments of orthopedic disease according to its type. So, it will be better to search for an experienced surgeon for better consultation and treatment.:</p>
                                    <ol>
                                        <li>Joint Immobilisation</li>
                                        <li>Medications</li>
                                        <li>Heat and Cold Packs</li>
                                        <li>Physiotherapy</li>
                                        <li>Surgery</li>
                                    </ol>
                                    <p>For severe orthopedic conditions, there are multiple surgical procedures. At the Prashant  Hospital, there is best <strong> surgeon in north bihar</strong>  . Our specialty is providing a state-of-the-art joint replacement for knee, hip, or shoulder replacement with cutting-edge technologies. </p>
                                    <p><strong>Hip fractures and replacement surgery:</strong> A hip fracture is a serious injury that can occur when the hip bone is broken. It is most common in older adults and mostly happens because of falls, osteoporosis, or other medical conditions. This surgery treats severe hip conditions, including hip fractures. During the procedure, the damaged hip joint is removed and replaced with an artificial joint, also known as a prosthesis. </p>
                                    <p><strong>Knee Replacement Surgery:</strong> We perform partial and total knee replacements for</p>
                                    <p>During the procedure, the damaged knee joint is removed and replaced with an artificial joint, also known as a prosthesis. The prosthesis can be made of various materials, including metal, plastic, or ceramic, and is designed to function like a natural knee joint.</p>

                                    <ol>
                                        <li><strong className='strong'>Shoulder and Elbow Replacement:</strong> We specialize in total and reverse shoulder replacement, which allows the shoulder to function properly and relieves pain. This is done for arthritis and fractures around the shoulder. Similarly, we perform elbow replacements for elbow arthritis and fractures. During the procedure, the damaged joint is removed and replaced with an artificial joint, also known as a prosthesis. The prosthesis can be made of various materials, including metal, plastic, or ceramic, and is designed to function like a natural joint.
                                        </li><li><strong className='strong'>Trauma and fracture management:</strong> trauma and fracture management treat the condition of injuries and fractures affecting the bones, joints, and soft tissues of the musculoskeletal system. We specialize in complex and open fracture management as well as the management of fractures around replaced metallic joints.
                                        </li><li><strong className='strong'>Fracture Repair:</strong> According to the Our Experts , the fracture repair surgery procedure repairs broken bones and allows them to heal over time. The most common techniques used to repair fractures include casting, open reduction and internal fixation (ORIF), and external fixation.
                                        </li><li><strong className='strong'>Ligament and tendon repair:</strong> Ligament and tendon injuries can be very painful and limiting. Ligaments are fibrous tissues that connect bones to each other, while tendons are fibrous tissues that connect muscles to bones. For ligament injuries, the surgeon may use sutures or other devices to repair the torn ligament or may use a graft to replace the damaged tissue. The graft can be taken from another part of the patient's body or from a donor. For tendon injuries, the surgeon may also use sutures or other devices to repair the damaged tendon or may use a graft to replace the damaged tissue. In some cases, the surgeon may need to detach the tendon from the bone and reattach it using screws or other devices. We do ACL and PCL arthroscopic reconstructions in the knee. We do rotator cuff tendon repair arthroscopically in the shoulder. We also treat shoulder dislocations arthroscopically.
                                        </li><li><strong className='strong'>Soft-tissue or bone tumor</strong> removal surgery removes abnormal growths (tumors) from the body. This surgery prevents the tumor from re growing. In some cases, the surgeon may also need to remove nearby lymph nodes to check for the spread of cancer.
                                        </li><li><strong className='strong'>Hand Surgery:</strong> There are modern hand and foot surgeries like carpal tunnel release, trigger finger release, and tendon repair or reconstruction. Carpal tunnel release involves cutting the ligament that is compressing the median nerve in the wrist to relieve symptoms of carpal tunnel syndrome. We also do replacement of small joints in the hands for arthritis, as well as fusion surgery for painful joints.
                                        </li><li><strong className='strong'>Correction of Bone Deformities:</strong> This surgical procedure aims to restore the normal alignment and function of deformed bones due to injury, disease, or congenital abnormalities. It involves making precise cuts in the bone and repositioning the fragments in the correct alignment. The most common techniques used to correct bone deformities are osteotomies, distraction osteogenesis, and bone grafting.
                                        </li><li><strong className='strong'>Spine Surgery:</strong> This surgery treats chronic issues of the spine, such as degenerative disc disease, herniated discs, spinal stenosis, scoliosis, and spinal cord injuries. The surgery can be done through open surgery or minimally invasive surgery, depending on the specific condition and the surgeon's expertise. The most common types of spine surgery include discectomy, laminectomy, spinal fusion, artificial disc replacement, and
                                        </li><li><strong className='strong'>Debridement of Damaged Tissue:</strong> Debridement is the process of removing damaged, dead, or infected tissue from a wound or injured area. This is often done to promote healing and prevent infection. The damaged tissue can interfere with healing and provide a breeding ground for bacteria, which can lead to infection. This surgery includes mechanical debridement, enzymatic debridement, autolytic debridement, and surgical debridement.
                                    </li></ol>

                                </div>
                            </div>
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

                <div class="emergency-area ptb-100">
    <div class="container">
        <div class="row">
            <div class="col-lg-7">
                <div class="emergency-content">
                    <h2>Get an Appointment at <b>Prashant Hospital</b></h2>
                    <p>We are always at your side. We are 24 hours available for you in emergency situation.</p>
                    <div class="emergency-icon-content">
                        <img src="https://seduloussoftech.com/PMCH/assets/img/24_hours.png" alt="Images"/>
                        <h3><a href="tel:+91-18003457777">+91 - 18003457777</a></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="emergency-shape">
        <img src="https://seduloussoftech.com/PMCH/assets/img/emergency-shape.png" alt="Images"/>
    </div>
</div>

                {/* <div className="promo-wrap style3 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="promo-card style3">
              <div className="promo-icon">
              <img src={require('../imgs/admision-form.png').default} style={{width:45, marginLeft:15}} className="flaticon-admision-form"></img>
              </div>
              <div className="promo-info">
                <h3>Contact Our Doctor</h3>
                <p>There are many variations of passages of words are valid.</p>
                <Link to="#" className="link style2">View All Services <FaArrowRight />
</Link>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="promo-card style3">
              <div className="promo-icon">
              <img src={require('../imgs/male.png').default} style={{width:45, marginLeft:15}} className="flaticon-admision-form"></img>
              </div>
              <div className="promo-info">
                <h3>Need Family Health</h3>
                <p>There are many variations of passages of words are valid.</p>
                <Link to="https://seduloussoftech.com/PMCH/book-appointment" className="link style2">Book Appointment <FaArrowRight /></Link>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="promo-card style3">
              <div className="promo-icon">
              <img src={require('../imgs/headphones.png').default} style={{width:45, marginLeft:15}} className="flaticon-admision-form"></img>
              </div>
              <div className="promo-info">
                <h3>24 Hours Service</h3>
                <p>There are many variations of passages of words are valid.</p>
                <Link to="#" className="link style2">Provide Registration <FaArrowRight /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cta-wrap pt-75">
          <div className="row gx-5 align-items-center">
            <div className="col-xl-8 col-lg-7">
              <div className="cta-content">
                <div className="cta-logo">
                  <img src="https://seduloussoftech.com/PMCH/assets/img/cta-icon-2.png" alt="Image" />
                </div>
                <div className="content-title style2">
                  <h2>Request an Appointment at Prashant Hospital        Call Now : 18003457777</h2>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="cta-btn">
                <Link to="https://seduloussoftech.com/PMCH/book-appointment" className="btn style2">Make Appointment</Link>
                <Link to="https://seduloussoftech.com/PMCH/contact-us" className="btn style8">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}

            
            </div>

      <BackToTopButton/>

            <Footer />
        </>
    );
}

export default Orthopedics;
