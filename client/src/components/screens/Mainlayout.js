import React from "react";
import Navbar from "../screens/Navbar";
import Footer from "../screens/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="content">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
