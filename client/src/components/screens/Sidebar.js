import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header ";
import VerticalMenu from "./VerticalMenu ";
import ContentWrapper from "./Contentwrapper";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Router>
      <Route>
        <Switch>
      <div className="wrapper">
        <Header />
        <VerticalMenu />
        <ContentWrapper/>
      </div>
      </Switch>
              </Route>
    </Router>
  );
};

export default Sidebar;