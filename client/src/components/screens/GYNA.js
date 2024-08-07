import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';
import axios from 'axios';

const GYNA = () => {
    const [gynaData, setGynaData] = useState(null);
    const [error, setError] = useState(null);
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
      const fetchGynaData = async () => {
          try {
              const response = await axios.get('/api/auth/gyna'); // Adjust the API endpoint as per your backend route
              const gynaData = response.data;
  
              const gynaDataWithImages = gynaData.map(data => ({
                  ...data,
                  image1: `data:image/png;base64,${data.image1}`,
                  image2: `data:image/png;base64,${data.image2}`
              }));
  
              setGynaData(gynaDataWithImages);
  
              if (gynaDataWithImages.length > 0) {
                  setPageTitle(gynaDataWithImages[0].title);
              }
          } catch (error) {
              console.error('Error fetching gynaecology data:', error);
              setError('Failed to fetch gynaecology data');
          }
      };
  
      fetchGynaData();
  }, []);
  

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!gynaData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2 dangerouslySetInnerHTML={{ __html: pageTitle }}></h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/services">Specialties</Link></li>
                                <li dangerouslySetInnerHTML={{ __html: pageTitle }}></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="service-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                            {gynaData.map((data, index) => (
                                <div key={index} className="col-xl-8">
                                    <article>
                                        <div className="post-img">
                                            <div className="row">
                                            <h2 dangerouslySetInnerHTML={{ __html: pageTitle }}></h2>
                                                <div className="col-md-6">
                                                    <a className="single-service-img" data-fancybox="gallery" href={data.image1}>
                                                        <img src={data.image1} alt={data.title} />
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a className="single-service-img" data-fancybox="gallery" href={data.image2}>
                                                        <img src={data.image2} alt={data.title} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-para" dangerouslySetInnerHTML={{ __html: data.content }} />
                                    </article>
                                </div>
                            ))}
                            <div className="col-xl-4">
                                <div className="sidebar bg-white">
                                    <div className="sidebar-widget categories">
                                        <h4>Top Services</h4>
                                        <div className="category-box">
                                            <ul className="list-style">
                                                <li>
                                                    <Link to="service-one.html">Cardiology Department</Link>
                                                </li>
                                                {/* Other list items */}
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
            <Footer />
            <BackToTopButton />
        </>
    );
}

export default GYNA;