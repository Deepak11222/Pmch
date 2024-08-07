import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import VideoUpload from "./VideoUpload";
// import Photos from "./Photos";
import Dashboard from "./DashboardScreen";
// Import other page components here

const AdminPages = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AdminHeader currentPage="Admin Panel" />
        <div className="content">
          <Switch>
            <Route exact path="/admin/video" component={VideoUpload} />
            {/* <Route exact path="/admin/photos" component={Photos} /> */}
            <Route exact path="/admin/dashboard" component={Dashboard} />
            {/* Add other routes for different pages */}
          </Switch>
        </div>
      </div>
    </>
  );
};

export default AdminPages;
