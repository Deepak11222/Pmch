import React from "react";
import Sidebar from "./Sidebar";
import UsersContent from "./UsersContent";
import "./DashboardScreen.css";

const Users = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <UsersContent />
      </div>
    </div>
  );
};

export default Users;
