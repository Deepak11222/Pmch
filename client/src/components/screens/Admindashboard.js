import React from "react";
import "./DashboardScreen.css";
import Sidebar from "./Sidebar";
import MainDash from "../MainDash/MainDash";
import Adminpanelsidebar from "./Adminpanelsidebar";

const Admindashboard = () => {
  return (
    <div className='App'>
      {/* <div className="AppGlass"> */}
        <Adminpanelsidebar/>
        {/* <MainDash /> */}
      </div>
    // </div>
  );
}

export default Admindashboard;