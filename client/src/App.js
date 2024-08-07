import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import About from "./components/screens/About";
import FAQ from "./components/screens/FAQ";
import TPA from "./components/screens/TPA";
import Medicine from "./components/screens/Medicine";
import Nephrology from "./components/screens/Nephrology";
import Urology from "./components/screens/Urology";
import Orthopedics from "./components/screens/Orthopedics";
import GALS from "./components/screens/GALS";
import Cardiology from "./components/screens/Cardiology";
import AppointmentForm from "./components/screens/AppointmentForm";
import ContactSection from "./components/screens/Contact";
import Slide from "./components/screens/Slide";
import PrivateScreen from "./components/screens/PrivateScreen";
import Users from "./components/screens/Users";
import Dashboard from "./components/screens/DashboardScreen";
import SuperAdminLayout from "./components/screens/SuperAdminLayout";
import LoginScreen from "./components/screens/LoginScreen";
import Addstore from "./components/screens/Pagescategory";
import VerticalMenu from "./components/screens/VerticalMenu ";

// Import the new store admin components
import StoreAdminLogin from "./components/screens/StoreAdminLogin";
import StoreAdminDashboard from "./components/screens/StoreAdminDashboard";
import StoreAdminPrivateRoute from "./components/routing/StoreAdminPrivateRoute";
import AdminLayout from "./components/screens/AdminLayout";
import Adminpanelsidebar from "./components/screens/Adminpanelsidebar";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/login" component={LoginScreen} />
        <Route path="/admin/register" component={RegisterScreen} />
        <Route path="/admin/forgotpassword" component={ForgotPasswordScreen} />
        <Route path="/admin/passwordreset/:resetToken" component={ResetPasswordScreen} />

        <Route path="/admin">
          <SuperAdminLayout>
            <Switch>
              <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/admin/menu" component={VerticalMenu} />
              <PrivateRoute exact path="/admin/addstore" component={Addstore} />
              <PrivateRoute exact path="/admin/about" component={About} />
              <PrivateRoute exact path="/admin/faq" component={FAQ} />
              <PrivateRoute exact path="/admin/tpa" component={TPA} />
              <PrivateRoute exact path="/admin/medicine" component={Medicine} />
              <PrivateRoute exact path="/admin/nephrology" component={Nephrology} />
              <PrivateRoute exact path="/admin/urology" component={Urology} />
              <PrivateRoute exact path="/admin/orthopedics" component={Orthopedics} />
              <PrivateRoute exact path="/admin/gals" component={GALS} />
              <PrivateRoute exact path="/admin/contact" component={ContactSection} />
              <PrivateRoute exact path="/admin/appointment" component={AppointmentForm} />
              {/* <PrivateRoute exact path="/admin/cardiology" component={Cardiology} /> */}
              <PrivateRoute exact path="/admin/slide" component={Slide} />
              <PrivateRoute exact path="/admin/privatescreen" component={PrivateScreen} />
              <PrivateRoute exact path="/admin/users" component={Users} />
              {/* Add more admin routes here */}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          </SuperAdminLayout>
        </Route>

        <Route path="/storeadmin">
          <AdminLayout>
            <Switch>
              {/* Add routes for store admin login and dashboard */}
              <Route path="/storeadmin/login" component={StoreAdminLogin} />
              <StoreAdminPrivateRoute path="/storeadmin/dashboard" component={Adminpanelsidebar} />
              <StoreAdminPrivateRoute path="/storeadmin/private" component={PrivateScreen} />
              <Redirect from="/storeadmin" to="/storeadmin/dashboard" />
            </Switch>
          </AdminLayout>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;