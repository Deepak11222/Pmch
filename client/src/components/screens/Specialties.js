import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './responsive.css';
import './Style.css';
import axios from 'axios';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Navbar from './Navbar';
import BackToTopButton from './BackToTopButton ';
import Footer from './Footer';

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get('/api/auth/specialties');
      const specialtiesData = response.data;

      // Assuming the image data is returned as base64-encoded string in the 'image' field of each Specialty object
      const specialtiesWithImages = specialtiesData.map(specialtie => ({
        ...specialtie,
        image: `data:image/png;base64,${specialtie.image}` // Adjust the format if the image format is different
      }));

      setSpecialties(specialtiesWithImages);
    } catch (error) {
      console.error('Error fetching Specialties:', error);
      // setError('Failed to fetch Specialties');
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  function generateSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  return (
    <>
      <Navbar />
      <div className="content-wrapper">
        <div className="breadcrumb-wrap bg-f br-2">
          <div className="container">
            <div className="breadcrumb-title">
              <h2>Specialties</h2>
              <ul className="breadcrumb-menu list-style">
                <li><Link to="/">Home</Link></li>
                <li>Specialties</li>
              </ul>
            </div>
          </div>
        </div>

        {/* <section className="service-wrap ptb-100 bg-athens"> */}
          <div className="promo-wrap ptb-100 bg-athens">
            <div className="container">
              <div className="section-title style1 text-center mb-40">
                <span>Our Specialties</span>
                <h2>We're Providing Best Services</h2>
              </div>
              <div className="row justify-content-center">
                {specialties.length > 0 ? (
                  specialties.map((specialtie, index) => (
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
                  ))
                ) : (
                  <div className="text-center">Loading...</div>
                )}
              </div>
            </div>
          </div>
        {/* </section> */}
      </div>

      <div className="emergency-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="emergency-content">
                <h2>Get an Appointment at <b>Prashant Hospital</b></h2>
                <p>We are always at your side. We are available 24 hours for you in an emergency situation.</p>
                <div className="emergency-icon-content">
                  <img src="https://seduloussoftech.com/PMCH/assets/img/24_hours.png" alt="24 Hours" />
                  <h3><a href="tel:+91-18003457777">+91 - 18003457777</a></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="emergency-shape">
          <img src="https://seduloussoftech.com/PMCH/assets/img/emergency-shape.png" alt="Emergency Shape" />
        </div>
      </div>

      <BackToTopButton />

      <Footer />
    </>
  );
}

export default Specialties;