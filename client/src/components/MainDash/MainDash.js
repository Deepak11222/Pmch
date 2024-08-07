import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cards from '../Cards/Cards';
import './MainDash.css';
import Users from '../screens/Users';
// import AdminHeader from '../screens/AdminHeader';
import AdminPhotosPage from '../screens/Adminpoto';

const MainDash = () => {
  return (
    <div className='dashboard-container'>
      {/* <AdminHeader /> */}
      {/* <div className='main-content'> */}
        <Router>
          <h1 className='dashboard-title'>Dashboard</h1>
          <Cards />
          <Route path='/users' component={Users}></Route>
          <Route path='/adminphoto' component={AdminPhotosPage}></Route>
        </Router>
      </div>
    // </div>
  );
}

export default MainDash;
