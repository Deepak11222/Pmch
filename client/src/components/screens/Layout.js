// Layout.js
import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      
    </div>
  );
};

export default Layout;
