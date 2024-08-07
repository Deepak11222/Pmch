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

const Nephrology= () => {
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
                            <h2>Nephrology</h2>
                            <ul className="breadcrumb-menu list-style">
                            <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Specialties</Link></li>
                                <li>Nephrology</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="service-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                            <div className="col-xl-8">
                                <div className="service-desc">
                                    <h2>Nephrology</h2>
                                    <p>Nephrology is the medical term for the diagnosis and treatment of kidney diseases. Kidneys, the two bean-shaped organs behind your belly, are responsible for excreting waste products from the blood and maintaining the salt and water concentration of the body. Nephrologists help people establish healthy kidneys, which perform vital body functions.</p>                                    <div className="row">
                                    <p>A kidney disorder can lead to various health issues. Kidney diseases have a widespread prevalence, and therefore kidney care requires your full attention.</p>
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
                                    <h3>Which are the Common Kidney Diseases?</h3>
                                    <p>Kidney disease involves any disturbance in the normal functioning of the kidneys. Many conditions can affect your kidneys. Here are a couple of the common ones -</p>
                                    <ol>
<li><strong>Kidney Stones :</strong> Kidney stones are now common among every age group. Kidney stones are hard deposits of minerals and salts inside the kidney. They form due to a fatty diet, lack of exercise, or side effects of certain supplements. These stones can accumulate in any part of the urinary tract, such as the bladder, urethra, or urinary tubes.</li>
<li><strong>Chronic Kidney Disease :</strong> Chronic Kidney Disease (CKD) happens when the kidneys are somehow damaged and cannot filter the blood. CKD is common in people with diabetes and high blood pressure. A nephrologist or healthcare specialist performs various tests to check the functioning of the kidney. .</li>


</ol>
<h3>When Should I Consult a Nephrologist?</h3>

<p>Typical symptoms of kidney diseases include feelings of fatigue and nausea accompanied by trouble with urination, such as :</p>

<ol>
<li>Frequent urination.</li>
<li>Change in the color of the urine.</li>
<li>Burning sensation during urination.</li>
</ol>

<p>Patients who have kidney stones specifically suffer from extreme pain in the abdomen near the kidneys and sudden fluctuations in pain.</p>
<p>The symptoms specific to CKD are vomiting, a loss of appetite, sleep apnea, i.e., shallow breathing during the night, high blood pressure, and muscle cramps.</p>

<h3>How are Kidney Diseases Treated? </h3>

<p>Nephrologists choose the treatment plan based on the type and severity of the disease.</p>

<h3>Treatment of Kidney Stones</h3>

<p>The treatment depends upon the size and area of the stone. The nephrologist will typically do a USG to find out its size. In the case of small stones, the doctor will prescribe drugs to dissolve them and pass them out of the body through the patient's urine.</p>

<p>In the case of large stones, lithotripsy, a type of shock treatment, can break the stones into smaller pieces. Then, they can exit the body through the urine. There are other treatment plans that the doctors may follow if needed.</p>

<h3>Treatment of CKD</h3>

<p>In the case of early-stage CKD, doctors will review the causes of the issue before prescribing a specific treatment. For instance, in the case of high blood pressure, the doctors or nephrologists will try to control the BP. If diabetes is an underlying cause, treatment efforts focus on maintaining the blood-sugar level.</p>

<p>The patients undergo dialysis in the later stages of kidney diseases. Dialysis is a procedure to remove excess fluid and waste from the blood and essentially purify the blood. This treatment artificially does the job of a healthy working kidney.</p>

<p>In extreme cases, the nephrologist may recommend a kidney transplant. They remove the damaged kidney, and a healthy donor kidney takes its place. A human body can easily survive on one kidney, and therefore, people can donate one of their kidneys to patients who need it.</p>


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
            </div>

      <BackToTopButton/>

            <Footer />
        </>
    );
}

export default Nephrology;
