import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';
import './responsive.css';
import './aos.css';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';

const Photos = () => {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get('/api/auth/media'); // Fetch media from your server
        setMedia(response.data);
      } catch (error) {
        console.error('Error fetching media:', error);
        setError('Failed to fetch media');
      }
    };

    fetchMedia();
  }, []);

  return (
    <>
      <Navbar />
      <div className="content-wrapper">
        <div className="breadcrumb-wrap bg-f br-2">
          <div className="container">
            <div className="breadcrumb-title">
              <h2>Media</h2>
              <ul className="breadcrumb-menu list-style">
                <li><Link to="/">Home</Link></li>
                <li>Media</li>
              </ul>
            </div>
          </div>
        </div>
        <section className="service-details-wrap ptb-100">
          <div className="container">
            <div className="row gx-5 justify-content-center">
              {media.map(mediaItem => (
                <div key={mediaItem._id} className="col-lg-4 col-md-6">
                  <div className="single-gallery-item">
                    <a data-fancybox="gallery" href={`data:image/png;base64,${mediaItem.image}`}>
                      <img src={`data:image/png;base64,${mediaItem.image}`} alt={mediaItem.name} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="emergency-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="emergency-content">
                  <h2>Get an Appointment at <b>Prashant Hospital</b></h2>
                  <p>We are always at your side. We are 24 hours available for you in an emergency situation.</p>
                  <div className="emergency-icon-content">
                    <img src="https://seduloussoftech.com/PMCH/assets/img/24_hours.png" alt="Images" />
                    <h3><a href="tel:+91-18003457777">+91 - 18003457777</a></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="emergency-shape">
            <img src="https://seduloussoftech.com/PMCH/assets/img/emergency-shape.png" alt="Images" />
          </div>
        </div>
      </div>

      <BackToTopButton />

      <Footer />
    </>
  );
}

export default Photos;