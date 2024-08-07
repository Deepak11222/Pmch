import React from 'react';
// import './AdminAboutUsPage.css';
import { Link } from 'react-router-dom';

const AdminAboutUsPage = () => {
    return (
        <div className="admin-about-us-page">
            <h2>About Us</h2>
            <Link to="/">Home</Link> {/* You may need to adjust the link path */}
            <div className="about-content">
                <h3>Prashant Memorial Charitable Hospital</h3>
                <p>Our focus is on your overall wellbeing and helping you achieve optimal health and aesthetics. We believe in delivering top-quality patient care. Our modern infrastructure and facilities that match international standards make us one of the leading and biggest hospitals in North Bihar. We aim at offering the finest healthcare services to all domestic and international patients at affordable prices.</p>
                <p>It is an expert in providing quality healthcare and valuable services, supported by a team of compassionate and dedicated medical professionals.</p>
            </div>
            <div className="vision-mission">
                <h3>Vision Mission</h3>
                <div className="vision-image">
                    <img src="https://seduloussoftech.com/PMCH/assets/img/vision.png" alt="Vision" />
                </div>
                <div className="mission">
                    <h4>Mission:</h4>
                    <p>Preserve health, enhance longevity and mitigate health problems by fully equipped highest quality, comprehensive and most affordable health care organization, delivered with kindness, vision and integrity.</p>
                    <h4>Vision:</h4>
                    <p>Delivery excellent medical facilities and compassionate care to all</p>
                </div>
                <div className="quality-product">
                    <h4>Our Quality Product:</h4>
                    <ol>
                        <li>We hereby assure quality healthcare to patients through reliable healthcare services, available medicines and maintainable equipments.</li>
                        <li>We shall ensure efficiency of operations and effectiveness of treatment through our competent human resources.</li>
                        <li>We shall review this policy for continuing suitability, adequacy and effectiveness.</li>
                        <li>We shall achieve this through the quality objectives and targets set for various departments.</li>
                    </ol>
                </div>
            </div>
            <div className="emergency-appointment">
                <h2>Get an Appointment at Prashant Hospital</h2>
                <p>We are always at your side. We are 24 hours available for you in emergency situations.</p>
                <div className="emergency-contact">
                    <img src="https://seduloussoftech.com/PMCH/assets/img/24_hours.png" alt="Images" />
                    <h3><a href="tel:+91-18003457777">+91 - 18003457777</a></h3>
                </div>
            </div>
        </div>
    );
}

export default AdminAboutUsPage;
