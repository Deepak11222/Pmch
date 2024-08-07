import React, { useState, useEffect } from 'react';
// import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
// import Opdsection from './Opdsection';

const CounterComponent = () => 
{

  const [blogs, setBlogs] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  const fetchSecialties = async () => {
    try {
      const response = await axios.get('/api/auth/specialties');
      const specialtiesData = response.data;
  
      // Assuming the image data is returned as base64-encoded string in the 'image' field of each Blog object
      const specialtiesWithImages = specialtiesData.map(specialtie => ({
        ...specialtie,
        image: `data:image/png;base64,${specialtie.image}` // Adjust the format if the image format is different
      }));
  
      setSpecialties(specialtiesWithImages);
    } catch (error) {
      console.error('Error fetching Blogs:', error);
      // setError('Failed to fetch Blogs');
    }
  };

  useEffect(() => {
    fetchSecialties();
  }, []);

  useEffect(() => {
    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/auth/blog'); // Adjust the API endpoint as per your backend route
            const blogsData = response.data;
            
            // Assuming the image data is returned as base64-encoded string in the 'image' field of each blog object
            const blogsWithImages = blogsData.map(blog => ({
                ...blog,
                image: `data:image/png;base64,${blog.image}` // Adjust the format if the image format is different
            }));
            
            setBlogs(blogsWithImages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            // setError('Failed to fetch blogs');
        }
    };

    fetchBlogData();
}, []);

function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

  const testimonialData = [
    {
      clientName: "Tom Haris",
      clientOccupation: "Engineer, Olleo",
      clientQuote: "Lorem ipsum dolor sit amet adip selection repellat tetur delni vel quam aliq earu expel dolor eme fugiat enim amet sit dolor.",
      // clientImage: "assets/img/testimonials/client-3.jpg"
    },
    {
      clientName: "Tom Haris",
      clientOccupation: "Engineer, Olleo",
      clientQuote: "Lorem ipsum dolor sit amet adip selection repellat tetur delni vel quam aliq earu expel dolor eme fugiat enim amet sit dolor.",
      // clientImage: "assets/img/testimonials/client-3.jpg"
    },
    {
      clientName: "Harry Jackson",
      clientOccupation: "Entrepreneur",
      clientQuote: "Lorem ipsum dolor sit amet adip selection repellat tetur delni vel quam aliq earu expel dolor eme fugiat enim amet sit dolor.",
      // clientImage: "assets/img/testimonials/client-4.jpg"
    },
    {
      clientName: "Chris Haris",
      clientOccupation: "MD, ITec",
      clientQuote: "Lorem ipsum dolor sit amet adip selection repellat tetur delni vel quam aliq earu expel dolor eme fugiat enim amet sit dolor.",
      // clientImage: "assets/img/testimonials/client-5.jpg"
    },
    {
      clientName: "Chris Haris",
      clientOccupation: "MD, ITec",
      clientQuote: "Lorem ipsum dolor sit amet adip selection repellat tetur delni vel quam aliq earu expel dolor eme fugiat enim amet sit dolor.",
      // clientImage: "assets/img/testimonials/client-5.jpg"
    }
  ]
    React.useEffect(() => {
        AOS.init();
      }, []); 
  
  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   prevArrow: <button type="button" className="slick-prev">Previous</button>,
  //   nextArrow: <button type="button" className="slick-next">Next</button>,
  // };

    
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3, 
    //     slidesToScroll: 1,
    //     responsive: [
    //       {
    //         breakpoint: 768,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1,
    //         },
    //       },
    //       // Add more breakpoints if needed
    //     ],
    //   };
  return (
    <>
            <section className="counter-wrap ptb-100 bg-blue">
            <div className="container">
                <div className="counter-card-wrap">
                    {/* Counter Card 1 */}
                    <div className="counter-card style2 aos-init aos-animate" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                        <span className="counter-icon">
                        <img src={require('../imgs/admision-form.png').default} style={{width:45, marginLeft:15}} className="flaticon-admision-form" alt=""></img>
                        </span>
                        <div className="counter-text">
                            <h2 className="counter-num">
                                <span className="odometer odometer-auto-theme" data-count="60">4.8</span>
                                {/* <span className="target">+</span> */}
                            </h2>
                            <p>Rating on Google</p>
                        </div>
                    </div>
                    {/* Counter Card 2 */}
                    <div className="counter-card style2 aos-init aos-animate" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                        <span className="counter-icon">
                        <img src={require('../imgs/male.png').default} style={{width:45, marginLeft:15}} className="flaticon-admision-form" alt=""></img>
                        </span>
                        <div className="counter-text">
                            <h2 className="counter-num">
                                <span className="odometer odometer-auto-theme" data-count="99">150</span>
                                <span className="target">+</span>
                            </h2>
                            <p>Medical Beds</p>
                        </div>
                    </div>
                    {/* Counter Card 3 */}
                    <div className="counter-card style2 aos-init aos-animate" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
                        <span className="counter-icon">
                        <img src={require('../imgs/surgery-room.png').default} style={{width:45, marginLeft:15}} className="flaticon-admision-form" alt=""></img>
                        </span>
                        <div className="counter-text">
                            <h2 className="counter-num">
                                <span className="odometer odometer-auto-theme" data-count="700">24</span>
                                {/* <span className="target">+</span> */}
                            </h2>
                            <p>Availability</p>
                        </div>
                    </div>
                    {/* Counter Card 4 */}
                    <div className="counter-card style2 aos-init aos-animate" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500">
                        <span className="counter-icon">
                        <img src={require('../imgs/blood-tube.png').default} style={{width:45, marginLeft:15}} className="flaticon-admision-form" alt=""></img>
                        </span>
                        <div className="counter-text">
                            <h2 className="counter-num">
                                <span className="odometer odometer-auto-theme" data-count="70">15</span>
                                <span className="target">+</span>
                            </h2>
                            <p>Medical Services</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
     
    <section className="service-wrap ptb-100 bg-athens">
      {/* <div className="container"> */}

      <div className="promo-wrap ptb-100 bg-athens">
  <div className="container">
    <div className="section-title style1 text-center mb-40">
      <span>Our Specialties</span>
      <h2>We're Providing Best Services</h2>
    </div>
    <div className="row justify-content-center">
    {specialties.map((specialtie, index) => (
        <div key={index} className="col-xl-4 col-lg-6 col-md-6 aos-init" data-aos="fade-up" data-aos-duration="1200" data-aos-delay={200 + index * 100}>
            <div className="promo-card">
                <div className="promo-icon">
                    <img src={specialtie.image} alt={specialtie.title} />
                </div>
                <div className="promo-info">
                    <Link to={`/page/${generateSlug(specialtie.title)}`}>
                        <h3>{specialtie.title}</h3>
                    </Link>
                    <p>{specialtie.description}</p>
                </div>
            </div>
        </div>
    ))}
</div>

  </div>
</div>

      {/* </div> */}
    </section>

        {/* <Opdsection/>   */}

    {/* <section className="appointment-wrap style1 bg-athens">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="200">
            <div className="appointment-content">
              <div className="content-title style1">
                <span>Best Solutions</span>
                <h2>Awesome Smart Health Can Make Your Life Easier</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste cupiditate sit debitis, aut, perferendis praesentium alias, asperiores similique veniam vitae veritatis.</p>
              </div>
              <ul className="content-feature-list list-style">
                <li><i className="ri-checkbox-circle-line"></i>Top Professional Team</li>
                <li><i className="ri-checkbox-circle-line"></i>World Class Dental Services</li>
                <li><i className="ri-checkbox-circle-line"></i>Discount On Treatment Fees</li>
                <li><i className="ri-checkbox-circle-line"></i>Multi-Functional Hospital</li>
                <li><i className="ri-checkbox-circle-line"></i>20+ Years Of Experience</li>
                <li><i className="ri-checkbox-circle-line"></i>Top Professional Specialist</li>
              </ul>
              <a href="contact.html" className="btn style1">Contact Us Now</a>
            </div>
          </div>
          <div className="col-lg-6 aos-init aos-animate" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
            <div className="appointment-bg bg-f">
              <form action="#" className="appointment-form">
                <h2>Book An Appointment</h2>
                <div className="form-group">
                  <input type="text" placeholder="Full name" />
                </div>
                <div className="form-group">
                  <input type="number" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <select name="select_doctor" id="select_doctor">
                    <option value="0" data-display="Select Doctor">Select Doctor</option>
                    <option value="1">Dr. Novlel Josef</option>
                    <option value="2">Dr. Fredrick Henry</option>
                    <option value="3">Dr. Steave Mark</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="date" />
                </div>
                <button type="submit" className="btn style2">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section> */}

       
    <section className="testimonial-wrap style1 ptb-100 bg-athens">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8">
            <div className="section-title style2 mb-40">
              <span>Testimonial</span>
              <h2>The Main Reason For Your Choice Is Our Best Service</h2>
            </div>
          </div>
        </div>
        <div class="elfsight-app-cce2191c-0349-40f3-ac7b-f1908f2cf53d"></div>
        {/* <div className="testimonial-slider-one owl-carousel owl-loaded owl-drag">
          <div className="owl-stage-outer owl-height" style={{ height: '284.391px' }}>
            <OwlCarousel
              className="owl-stage"
              loop
              margin={10}
              nav
            >
              {testimonialData.map((testimonial, index) => (
                <div key={index} className="testimonial-card style3 aos-init" data-aos="fade-up" data-aos-duration="1200" data-aos-delay={400 * (index + 1)}>
                  <ul className="ratings list-style">
                    <li><i className="ri-star-fill"></i></li>
                    <li><i className="ri-star-fill"></i></li>
                    <li><i className="ri-star-fill"></i></li>
                    <li><i className="ri-star-fill"></i></li>
                    <li><i className="ri-star-fill"></i></li>
                  </ul>
                  <p className="client-quote">{testimonial.clientQuote}</p>
                  <div className="client-info-area">
                    <div className="client-info-wrap">
                      <div className="client-img">
                        <img src={testimonial.clientImage} alt="Client" />
                      </div>
                      <div className="client-info">
                        <h3>{testimonial.clientName}</h3>
                        <span>{testimonial.clientOccupation}</span>
                      </div>
                    </div>
                    <div className="quote-icon">
                      <i className="flaticon-quote-2"></i>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
          <div className="owl-nav">
            <button type="button" role="presentation" className="owl-prev"><i className="ri-arrow-left-s-line"></i></button>
            <button type="button" role="presentation" className="owl-next"><i className="ri-arrow-right-s-line"></i></button>
          </div>
          <div className="owl-dots "></div>
        </div> */}
        <div className="cta-wrap pt-100">
          <div className="row gx-5 align-items-center">
            <div className="col-xl-8 col-lg-7">
              <div className="cta-content">
                <div className="cta-logo">
                  {/* <img src="assets/img/cta-icon.png" alt="Image" /> */}
                </div>
                <div className="content-title">
                  <h2>Don't Hesitate To Contact us</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto inventore voluptatem possimus quibusdam veritatis. Accusamus ipsum saepe quas.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="cta-btn">
                <a href="appointment.html" className="btn style1">Make Appointment</a>
                <a href="contact.html" className="btn style2">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



        <section className="blog-wrap pt-100 pb-75">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
            <div className="section-title style1 text-center mb-40">
              <span>Our Blog</span>
              <h2>Our Latest & Most Popular Tips & Tricks For You</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
                            {blogs.map(blog => (
                                <div key={blog._id} className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="blog-card style2">
                                        <div className="blog-img">
                                            <Link to="#">
                                                <img src={blog.image} alt={blog.title} />
                                            </Link>
                                        </div>
                                        <div className="blog-info">
                                            <h3><Link to="#">{blog.blogtitle}</Link></h3>
                                            <p><Link to="#">{blog.shortdiscription}</Link></p>
                                            {/* <p className="descs">{blog.content}</p> */}
                                            <Link to="/blog" className="link style2">Read More<FaArrowRight /></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
      </div>
    </section>


    
                    </>
  );
};

export default CounterComponent;