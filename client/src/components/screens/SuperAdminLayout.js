import React from "react";
// import "./Stylea.css";

const SuperAdminLayout = ({ children }) => {
  return (
    <div>
      <div className="content">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default SuperAdminLayout;