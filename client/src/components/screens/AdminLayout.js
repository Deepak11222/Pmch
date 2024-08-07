import React from "react";
// import "./Stylea.css";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div className="content">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminLayout;
