import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import Slide from './Slide'; // Import your HeroSlider component
import Footer from './Footer'; // Import your Footer component
import CounterComponent from './Counter';
import BackToTopButton from './BackToTopButton ';

const MainContent = () => {

  return (
    <div>
      <Navbar />

      {/* Your HeroSlider component */}

      {/* Your main content goes here */}
      {/* <div> */}
        {/* <div className="hero-wrap style1"> */}
      <Slide />
      <CounterComponent/>
      <BackToTopButton/>
      

      <Footer />
    </div>
  );
};

export default MainContent;