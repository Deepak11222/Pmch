import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton ';
import axios from 'axios';

const OPD = () => {
    const [opdData, setOPDData] = useState([]);

    useEffect(() => {
        fetchOPDData();
    }, []);

    const fetchOPDData = async () => {
        try {
            const response = await axios.get('/api/auth/opd');
            setOPDData(response.data);
        } catch (error) {
            console.error('Error fetching OPD data:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="content-wrapper">
                <div className="breadcrumb-wrap bg-f br-2">
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Opd Time Schedule</h2>
                            <ul className="breadcrumb-menu list-style">
                                <li><Link to="/">Home</Link></li>
                                <li>Opd Time Schedule</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="service-wrap ptb-100 bg-athens">
                    <div className="container">
                        <div className="doctor-calendar-table table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Doctor</th>
                                        {/* <th>Qualification</th> */}
                                        {/* <th>Designation</th> */}
                                        <th>Department</th>
                                        <th>SUN</th>
                                        <th>MON</th>
                                        <th>TUE</th>
                                        <th>WED</th>
                                        <th>THU</th>
                                        <th>FRI</th>
                                        <th>SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {opdData.map((opd, index) => (
                                        <tr key={index}>
                                            <td>
                                                <h3>{opd.doctor.name}</h3>
                                                <span>{opd.qualification}</span>
                                                <span>{opd.designation}</span>
                                            </td>
                                            <td><h3>{opd.department}</h3></td>
                                            <td><span className="time">{opd.schedule.day1}</span></td>
                                            <td><span className="time">{opd.schedule.day2}</span></td>
                                            <td><span className="time">{opd.schedule.day3}</span></td>
                                            <td><span className="time">{opd.schedule.day4}</span></td>
                                            <td><span className="time">{opd.schedule.day5}</span></td>
                                            <td><span className="time">{opd.schedule.day6}</span></td>
                                            <td><span className="time">{opd.schedule.day7}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <BackToTopButton />
            <Footer />
        </>
    );
}

export default OPD;