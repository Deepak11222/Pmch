import React from 'react';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("authToken");
    window.location.reload();
    window.location.href = "/admin/login";
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#" role="button" data-widget="pushmenu">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        {/* Uncomment below if needed */}
        {/* <li className="nav-item d-none d-sm-inline-block">
          <a href="https://seduloussoftech.com/" target="_blank" className="nav-link">Website</a>
        </li> */}
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="dropdown user user-menu">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <span className="hidden-xs">Superadmin</span>
            {/* <img  src={require('../imgs/usericon.png').default} className="user-image" alt="Superadmin" /> */}
          </a>
          <ul className="dropdown-menu" style={{right: '0px' }}>
            {/* User image */}
            <li className="user-footer">
              <div className="pull-left">
                <a href="#" className="btn btn-default btn-flat">Profile</a>
              </div>
              <div className="pull-right">
                <button onClick={handleLogout} className="btn btn-default btn-flat">Sign out</button>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Header;