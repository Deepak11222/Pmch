// import React, { useState, useEffect } from 'react';
// // import './responsive.css';
// // import './Style.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Navbar() {
//     const [pageSubCategories, setPageSubCategories] = useState([]);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
//     const [pageCategories, setPageCategories] = useState([]);
//     const [navbarOpen, setNavbarOpen] = useState(false); // State to manage navbar visibility

//     useEffect(() => {
//         const fetchPageSubCategories = async () => {
//             try {
//                 const response = await axios.get('/api/auth/pagesubcategories');
//                 console.log(response)
//                 setPageSubCategories(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching page subcategories:', error.message);
//             }
//         };

//         const fetchPageCategories = async () => {
//             try {
//                 const response = await axios.get('/api/auth/pagecategories');
//                 setPageCategories(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching page categories:', error.message);
//             }
//         };

//         fetchPageSubCategories();
//         fetchPageCategories();
//     }, []);

//     // Function to toggle navbar visibility
//     const toggleNavbar = () => {
//         setNavbarOpen(!navbarOpen);
//     };

//     return (
//         <header className="header-wrap style1">
//             <div className="header-top">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-lg-8">
//                             <div className="header-top-left">
//                                 <ul className="contact-info list-style">
//                                     <li>
//                                         <span><i className="ri-phone-fill"></i></span>
//                                         <a href="tel:18003457777">18003457777</a>
//                                     </li>
//                                     <li>
//                                         <span><i className="ri-map-pin-fill"></i></span>
//                                         <p>Juran-Chhapra, Road No.4, Mujaffarpur, Bihar</p>
//                                     </li>
//                                     <li>
//                                         <span><i className="ri-time-fill"></i></span>
//                                         <p>24x7x365</p>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-lg-4">
//                             <div className="header-top-right">
//                                 <ul className="social-profile list-style style1">
//                                     <li>
//                                         <a href="https://www.facebook.com/prashant.hospital/" target="_blank">
//                                             <i className="ri-facebook-fill"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="https://twitter.com/prashantmemoi2" target="_blank">
//                                             <i className="ri-twitter-fill"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#">
//                                             <i className="ri-mail-add-line"></i>
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="header-bottom">
//                 <div className="container">
//                     <nav className="navbar navbar-expand-lg navbar-light">
//                         <Link className="navbar-brand" to="/">
//                             <img className="logo-light" src="https://seduloussoftech.com/PMCH/assets/img/logo.png" alt="logo" />
//                         </Link>
//                         {/* <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-label="Toggle navigation">
//                             <i className="ri-menu-line"></i>
//                         </button> */}
//                         <div className={`navbar-collapse ${navbarOpen ? 'show' : ''}`}>
//                         {/* Close button */}
//                         {windowWidth <= 991 && navbarOpen && (
//                             <span className="close-button" onClick={toggleNavbar}>&times;</span>
//                         )}
//                             <ul className="navbar-nav ms-auto">
//                                 {pageCategories.map(category => {
//                                     const subPages = pageSubCategories.filter(subCategory => subCategory.category._id === category._id);
//                                     if (subPages.length > 0) {
//                                         return (
//                                             <li className="nav-item" key={category._id}>
//                                                 <a href="#" className="nav-link">
//                                                     {category.page} <i className="ri-arrow-down-s-line"></i>
//                                                 </a>
//                                                 <ul className="dropdown-menu">
//                                                     {subPages.map(subCategory => (
//                                                         <li className="nav-item" key={subCategory._id}>
//                                                             <a href={`/page/${subCategory.slug}`} className="nav-link">{subCategory.subPage}</a>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </li>
//                                         );
//                                     } else {
//                                         return (
//                                             <li className="nav-item" key={category._id}>
//                                                 <a href={`/${category.slug}`} className="nav-link">{category.page}</a>
//                                             </li>
//                                         );
//                                     }
//                                 })}
//                             </ul>
//                             <div className="other-options">
//                                 <div className="option-item">
//                                     <a href="#" className="btn style1">Book Appointment</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </nav>
//                     <div className="mobile-bar-wrap">
//                         <div className="mobile-menu d-lg-none">
//                             <a href="javascript:void(0)" onClick={toggleNavbar}>
//                                 <i className="ri-menu-line"></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Navbar;
