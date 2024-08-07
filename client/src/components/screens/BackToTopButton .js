import React from 'react';
// import { Link } from 'react-router-dom';
import './responsive.css';
import './Style.css';

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button className="back-to-top bounce open" style={{ display: 'inline' }} onClick={scrollToTop}>
      <i className="ri-arrow-up-s-line"></i>
    </button>
  );
};

export default BackToTopButton;
