import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';

const Ourdoctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/api/auth/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Our Doctors</h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li>Our Doctors</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="team-wrap ptb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            {doctors.map((doctor, index) => (
                                <div key={index} className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="200">
                                    <div className="team-card style2">
                                        <img src={`data:image/png;base64,${doctor.image}`} alt={doctor.name} />
                                        <div className="team-info">
                                            <h3>{doctor.name}</h3>
                                            <span>{doctor.designation}</span>
                                            <span>{doctor.qualification}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <BackToTopButton />
            <Footer />
        </>
    );
}

export default Ourdoctors;