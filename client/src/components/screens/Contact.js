import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { MdCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Footer from './Footer';

const ContactSection = () => {

    return (
        <>
      <Navbar />
        <div className="content-wrapper">
            {/* Breadcrumb Start */}
            <div className="breadcrumb-wrap bg-f br-1">
                <div className="container">
                    <div className="breadcrumb-title">
                        <h2>Contact Us</h2>
                        <ul className="breadcrumb-menu list-style">
                            <li><Link to="./">Home </Link></li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Contact Us section Start */}
            <section className="contact-us-wrap ptb-100">
                <div className="container">
                    <div className="row justify-content-center pb-75">
                        <div className="col-xl-5 col-lg-6 col-md-6">
                            <div className="contact-item">
                                <span className="contact-icon">
                                <i ><FaLocationDot /></i>
                                </span>
                                <div className="contact-info">
                                    <h3>Visit Us Anytime</h3>
                                    <p>Prashant Memorial Charitable Hospital, Juran Chapra Road no 4 Muzaffarpur.Bihar-842001</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6 col-md-6">
    <div className="contact-item">
        <span className="contact-icon">
            <i ><MdCall /></i>
        </span>
        <div className="contact-info">
            <h3>Call Center</h3>
            <span><span><b>Emergency</b></span> <b>:</b> <Link to="tel:9771423635">9771423635</Link></span>            <span><b>Reception</b> : <Link to="tel:9771423639">9771423639</Link></span>
            <span><b>TPA</b> : <Link to="tel:9771423640">9771423640</Link></span>
            <span><b>Appointment</b> : <Link to="tel:18003457777">18003457777</Link></span>
        </div>
    </div>
</div>

                    </div>
                    <div className="row gx-5">
                        <div className="col-xl-8 col-lg-7 col-12">
                            <div className="contact-form">
                                <h3>Send Us A Message</h3>
                                <form className="form-wrap" id="contactForm" noValidate>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="name" placeholder="Name*" id="name" required data-error="Please enter your name" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="email" name="email" id="email" required placeholder="Email*" data-error="Please enter your email" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="number" name="phone" id="phone" required placeholder="Phone Number*" data-error="Please enter your email" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="msg_subject" placeholder="Subject*" id="msg_subject" required data-error="Please enter your subject" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group v1">
                                                <textarea name="message" id="message" placeholder="Your Messages.." cols="30" rows="10" required data-error="Please enter your message"></textarea>
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check checkbox">
                                                <input name="gridCheck" value="I agree to the terms and privacy policy." className="form-check-input" type="checkbox" id="gridCheck" required />
                                                <label className="form-check-label" htmlFor="gridCheck">
                                                    I agree to the <Link className="link style1" to="/">terms &amp; conditions</Link> and <Link className="link style1" to="/">privacy policy</Link>
                                                </label>
                                                <div className="help-block with-errors gridCheck-error"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <button type="submit" className="btn style1 disabled" style={{ pointerEvents: 'all', cursor: 'pointer' }}>Send Message</button>
                                            <div id="msgSubmit" className="h3 text-center hidden"></div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-12">
                            <div className="comp-map">
                                <iframe width="820" height="577" id="gmap_canvas" src="https://maps.google.com/maps?q=Prashant+Memorial+Charitable+Hospital%2C+Juran+Chapra+Road+no+4+Muzaffarpur.Bihar-842001&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="Google Maps"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Us section End */}
        </div>

        <Footer/>
        </>
    );
}

export default ContactSection;