import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/screens/Layout";
import PrivateRoute from "./components/routing/PrivateRoute";
// import DashboardScreen from "./components/screens/DashboardScreen";
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Users from "./components/screens/Users";
import Footer from "./components/screens/Footer";
import Navbar from "./components/screens/Navbar";
import Slide from "./components/screens/Slide";
import MainContent from "./components/screens/Maincontent";
import AppointmentForm from "./components/screens/AppointmentForm";
import ContactSection from "./components/screens/Contact";
import Cardiology from "./components/screens/Cardiology";
import Orthopedics from "./components/screens/Orthopedics";
import GALS from "./components/screens/GALS";
import Urology from "./components/screens/Urology";
import Nephrology from "./components/screens/Nephrology";
import Medicine from "./components/screens/Medicine";
import TPA from "./components/screens/TPA";
import FAQ from "./components/screens/FAQ";
import About from "./components/screens/About";
import Dashboard from "./components/screens/DashboardScreen";
import Photos from "./components/screens/Photo";
import AdminPhoto from "./components/screens/Adminpoto";
import AdminHomePage from "./components/routing/Adminhome";
import Sidebar from "./components/screens/Sidebar";
import AdminVideosPage from "./components/screens/VideoUpload";
import ContentSection from "./components/screens/ContentSection";
import Ourdoctors from "./components/screens/Ourdoctors";
import OPD from "./components/screens/OPD"
// import Dash from "./components/screens/DashboardScreen";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>

          <PrivateRoute exact path="/" component={MainContent } />
          <PrivateRoute exact path="/opd-time-schedule" component={OPD} />
          <PrivateRoute exact path="/ourdoctors" component={Ourdoctors} />
          <PrivateRoute exact path="/sidebar" component={Sidebar} />
          {/* <PrivateRoute exact path="/adminmain" component={Adminmain} /> */}
          {/* <Redirect from="/sidebar" to="/adminhome" /> */}

          <PrivateRoute exact path="/layout" component={Layout} />
          <PrivateRoute exact path="/contentsection" component={ContentSection} />
          <PrivateRoute exact path="/adminhome" component={AdminHomePage} />
          <PrivateRoute exact path="/adminphotos" component={AdminPhoto} />
          {/* <PrivateRoute exact path="/admin" component={AdminPages} /> */}
          {/* <PrivateRoute exact path="/video" component={VideoUpload} /> */}
          <PrivateRoute exact path="/dash" component={Dashboard} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/faq" component={FAQ} />
          <PrivateRoute exact path="/tpa" component={TPA} />
          <PrivateRoute exact path="/medicine" component={Medicine} />
          <PrivateRoute exact path="/nephrology" component={Nephrology} />
          <PrivateRoute exact path="/urology" component={Urology} />
          <PrivateRoute exact path="/orthopedics" component={Orthopedics} />
          <PrivateRoute exact path="/gals" component={GALS} />
          <PrivateRoute exact path="/contact" component={ContactSection} />
          <PrivateRoute exact path="/appointment" component={AppointmentForm} />
          <PrivateRoute exact path="/cardiology" component={Cardiology} />
          <PrivateRoute exact path="/maincontent" component={MainContent} />
          <PrivateRoute exact path="/slide" component={Slide} />
          <PrivateRoute exact path="/footer" component={Footer} />
          <PrivateRoute exact path="/navbar" component={Navbar} />
          <PrivateRoute exact path="/privatescreen" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />

          {/* Protect the Users route */}
          <PrivateRoute exact path="/users" component={Users} />
          

          {/* Redirect to login for unauthorized routes */}
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;