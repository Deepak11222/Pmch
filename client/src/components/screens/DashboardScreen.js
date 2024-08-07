import React from "react";
import "./DashboardScreen.css";
import Sidebar from "./Sidebar";
import MainDash from "../MainDash/MainDash";
import Superadmindashboard from "./Superadmindashboard";

const Dashboard = () => {
  return (
    <div className='App'>
      {/* <div className="AppGlass"> */}
        <Sidebar />
        {/* <Superadmindashboard /> */}
        {/* <MainDash /> */}
      </div>
    // </div>
  );
}

export default Dashboard;