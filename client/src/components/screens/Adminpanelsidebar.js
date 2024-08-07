import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header ";
import VerticalMenu from "./VerticalMenu ";
import ContentWrapper from "./Contentwrapper";
import "./Sidebar.css";
import Adminsidebar from "./Adminsidebar";
import AdminWrapper from "./Adminwrapper";
import Adminheader from "./AdminHeader";

const Adminpanelsidebar = () => {
  return (
    <Router>
      <Route>
        <Switch>
      <div className="wrapper">
        <Adminheader />
        <Adminsidebar />
        <AdminWrapper/>
      </div>
      </Switch>
              </Route>
    </Router>
  );
};

export default Adminpanelsidebar;