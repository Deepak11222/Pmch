import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';
import axios from 'axios';

const TPA = () => {
    const [tpas, setTpas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTpaData = async () => {
            try {
                const response = await axios.get('/api/auth/tpa'); // Adjust the API endpoint as per your backend route
                const tpasData = response.data;
                
                // Assuming the image data is returned as base64-encoded string in the 'image' field of each TPA object
                const tpasWithImages = tpasData.map(tpa => ({
                    ...tpa,
                    image: `data:image/png;base64,${tpa.image}` // Adjust the format if the image format is different
                }));
                
                setTpas(tpasWithImages);
            } catch (error) {
                console.error('Error fetching TPAs:', error);
                setError('Failed to fetch TPAs');
            }
        };

        fetchTpaData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Tpa And Insurance</h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li>Tpa And Insurance</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="service-details-wrap ptb-100">
                    <div className="container">
                        <div className="row gx-5">
                            {tpas.map(tpa => (
                                <div key={tpa._id} className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-5">
                                    <div className="shadow-lg p-3 h-100 rounded bg-white">
                                        <a href="#">
                                            <img src={tpa.image} className="img-fluid" alt={tpa.company} />
                                            <p className="mb-0 mt-2 text-center font-weight-bold navybluec ">{tpa.company}</p>
                                        </a>
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

export default TPA;