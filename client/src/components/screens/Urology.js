import React from 'react';
import { Link } from 'react-router-dom';
// import { FaArrowRight } from "react-icons/fa";
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

const Urology = () => {
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

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Urology</h2>
                            <ul className="breadcrumb-menu list-style">
                            <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Specialties</Link></li>
                                <li>Urology</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="service-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                            <div className="col-xl-8">
                                <div className="service-desc">
                                    <h2>About Urology and Urologists</h2>
                                    <p>Urology is a field of medicine related to complications and disorders of the male and female genital urinary tracts. Specialized urologist offer best treatment.</p>
                                    <p>Urologists are medical practitioners with expertise in treating diseases and conditions that affect the urinary system, which includes the bladder, kidney, ureter, urethra, and adrenal glands. In males, they also treat all problems related to the penis, prostate, epididymis, seminal vesicles, and testes.</p>
                                    
                                                                        <div className="row">
                                        <div className="col-md-6">
                                            <Link className="single-service-img" data-fancybox="gallery" to="assets/img/services/single-service-1.jpg">
                                                <img alt="" src={require('../imgs/single-service-1.jpg').default}></img>
                                            </Link>
                                        </div>
                                        <div className="col-md-6">
                                            <Link className="single-service-img" data-fancybox="gallery" to="assets/img/services/single-service-2.jpg">
                                                <img alt="" src={require('../imgs/single-service-2.jpg').default }></img>
                                            </Link>
                                        </div>
                                    </div>
                                    <h3>Symptoms of Urological Problems :</h3>
                                    <p><strong>Here are a few symptoms that are a sign of a complication in the urinary tract and require a urologist's consultation :</strong></p>
                                    <ol>
                                        <li>A blood trace in urine is known as hematuria.</li>
                                        <li>Recurring urgency to urinate</li>
                                        <li>burning sensation or pain while urinating</li>
                                        <li>Difficulty in urination</li>
                                        <li>Pain in the lower back or pelvis</li>
                                        <li>Urine leakage</li>
                                        <li>weak flow of urine, dribbling</li>
                                    </ol>

                                    <p><strong>Ready to  connect with the best urologist in North Bihar when you come across any of the above symptoms.</strong></p>

                                    <p><strong>Signs that indicate a need to consult a urologist :</strong></p>

                                    <h3>Symptoms :</h3>

                                    <ol>
                                        <li>Pain in the testicles</li>
                                        <li>Painful and uncontrolled urination</li>
                                        <li>blood traces urine</li>
                                        <li>Erectile dysfunction</li>
                                        <li>Enlarged prostate</li>
                                        <li>Poor urine flow</li>
                                        <li>Urinary Retention</li>
                                        <li>Abdominal pain with nausea or vomiting</li>
                                        <li>Male infertility</li>
                                        <li>improper or undeveloped genital urinary tract</li>
                                    </ol>

                                    <h3>Diagnosis </h3>

                                    <p>There are a few tests that the urologist performs to analyze your condition :</p>

                                    <ol>
                                        <li>Imaging tests like CT scans,  ultrasounds give a perfect picture of the urinary tract condition.</li>
                                        <li>A post-void residual urine test is performed to analyze how quickly the urine exits the body. It also helps determine how much urine is left in the bladder after urination.</li>
                                        <li>Urine samples are checked to detect bacteria present in the urine.</li>
                                        <li>The urodynamic test measures the volume and pressure within the bladder.</li>
                                        <li>Uroflowmetry is used to measure urinary flow rate.</li>
                                    </ol>

                                    <h3>Treatment</h3>

                                    <p><strong>Prashant Hospital</strong> has emerged as one of the best urologist hospital in Patna, with advanced technology and highly skilled doctors to treat a variety of urinary complications.</p>

                                    <p>Treatments differ based on the diagnosis. It includes medication and surgery.</p>

                                    <p>Different kinds of medication include : </p>

                                    <ol>
                                        <li>Antibiotics to treat infections</li>
                                        <li>Drugs that work to relax the muscles of the bladder and control urinary incontinence</li>
                                    </ol>

                                    <p><strong>Surgery can be :</strong></p>

                                    <ol>
                                        <li>open surgery</li>
                                        <li>laparoscopic, or minimally invasive "keyhole" surgery</li>
                                    </ol>

                                    <h3>Surgery performed by urologists includes :</h3>
                                    <ol>
                                        <li>removal of the tumour or the complete bladder, prostate, or other parts when affected by cancer</li>
                                        <li>Perform repairs after a trauma.</li>
                                        <li>Treat strictures in the urethra that are due to scar tissue, called urethral dilation.</li>
                                        <li>Cure stress incontinence, for instance, with a sling procedure.</li>
                                        <li>The urinary tract stone was removed.</li>
                                        <li>Remove a kidney or its part.</li>
                                        <li> kidney transplantation</li>
                                    </ol>

                                    <p><strong>Here are a few major procedures and surgeries performed by urologists to analyse and treat urological conditions :</strong></p>

                                    <h3>Cystoscopy</h3>

                                    <p>A cystoscopy is a urology procedure that helps urologists examine the bladder lining and the urethra. A device called a cystoscopy is inserted in the urethra towards the bladder. It is used to diagnose and treat bladder conditions. An enlarged prostate is also diagnosed using this procedure. </p>

                                    <h3>Prostate Procedures</h3>

                                    <p><strong>Urologists use numerous procedures to diagnose and treat prostate conditions, including :</strong></p>

                                    <ol>
                                        <li>Prostate biopsy is a technique used to remove tissue samples from the prostate for testing in the lab.</li>
                                        <li>Transurethral resection of the prostate (TURP) is a minimally invasive surgery done using a special instrument known as a resectoscope to trim and seal the prostate tissue when there is inflammation in the prostate tissue causing urination difficulty.</li>
                                        <li>Transurethral incision of the prostate (TUIP) is a surgery done to treat benign prostatic hyperplasia (BPH). A small endoscope is inserted into the urethra. This opens the urinary channel for the urine to pass through.</li>
                                    </ol>

                                    <h3>Lithotripsy</h3>

                                    <p>Lithotripsy is a urology procedure that breaks down kidney stones using shock waves or lasers. The large stones are broken using lasers or shock waves so that they can pass through the urinary system.</p>

                                    <h3>Orchiopexy</h3>

                                    <p>Orchiopexy is a surgery used to bring down an undescended testicle. During this procedure, the testicle is moved from the abdomen, or groyne, and into the scrotum. A tacking stitch is used to attach it to the scrotum.</p>

                                    <h3>Penile Plication</h3>

                                    <p>Penile plication surgery in urology is a surgery used to correct the curvature in the penis caused by Peyronie’s disease. It is an outpatient surgery where sutures are placed on the opposite side of the scar, which causes curvature.</p>

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

export default Urology;