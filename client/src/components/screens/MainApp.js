import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout";
import PrivateRoute from "../routing/PrivateRoute";
import PrivateScreen from "./PrivateScreen";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Slide from "./Slide";
import MainContent from "./Maincontent";
import AppointmentForm from "./AppointmentForm";
import ContactSection from "./Contact";
import Cardiology from "./Cardiology";
import Orthopedics from "./Orthopedics";
import GALS from "./GALS";
import Urology from "./Urology";
import Nephrology from "./Nephrology";
import Medicine from "./Medicine";
import TPA from "./TPA";
import FAQ from "./FAQ";
import About from "./About";
import Dashboard from "./DashboardScreen";
import AdminPhoto from "./Adminpoto";
import AdminHomePage from "../routing/Adminhome";
import Sidebar from "./Sidebar";
import ContentSection from "./ContentSection";
import Ourdoctors from "./Ourdoctors";
import OPD from "./OPD";
import News from "./News";
import Blog from "./Blog";
import GYNA from "./GYNA";
import SinglePage from "./SinglePage";
import Specialties from "./Specialties";
import Ourteam from "./Ourteam";
import Patientcare from "./Patientcare";

const MainApp = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={MainContent} />
          <PrivateRoute exact path="/patient-care" component={Patientcare} />
          <Route path="/page/our-team">
            <Redirect to="/our-team" />
          </Route>
          <Route path="/our-team">
            <Ourteam />
          </Route>
          <Route path="/page/:slug" component={SinglePage} />
          <PrivateRoute exact path="/gyna" component={GYNA} />
          <PrivateRoute exact path="/news" component={News} />
          <PrivateRoute exact path="/blog" component={Blog} />
          <PrivateRoute exact path="/opd-time-schedule" component={OPD} />
          <PrivateRoute exact path="/our-doctors" component={Ourdoctors} />
          <PrivateRoute exact path="/sidebar" component={Sidebar} />
          <PrivateRoute exact path="/layout" component={Layout} />
          <PrivateRoute exact path="/contentsection" component={ContentSection} />
          <PrivateRoute exact path="/adminhome" component={AdminHomePage} />
          <PrivateRoute exact path="/adminphotos" component={AdminPhoto} />
          <PrivateRoute exact path="/dash" component={Dashboard} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/faq" component={FAQ} />
          <PrivateRoute exact path="/tpa" component={TPA} />
          <PrivateRoute exact path="/medicine" component={Medicine} />
          <PrivateRoute exact path="/nephrology" component={Nephrology} />
          <PrivateRoute exact path="/urology" component={Urology} />
          <PrivateRoute exact path="/orthopedics" component={Orthopedics} />
          <PrivateRoute exact path="/gals" component={GALS} />
          <PrivateRoute exact path="/contact-us" component={ContactSection} />
          <PrivateRoute exact path="/appointment" component={AppointmentForm} />
          <PrivateRoute exact path="/cardiology" component={Cardiology} />
          <PrivateRoute exact path="/maincontent" component={MainContent} />
          <PrivateRoute exact path="/slide" component={Slide} />
          <PrivateRoute exact path="/footer" component={Footer} />
          <PrivateRoute exact path="/navbar" component={Navbar} />
          <PrivateRoute exact path="/privatescreen" component={PrivateScreen} />
          {/* Redirect to dashboard for unauthorized routes */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainApp;