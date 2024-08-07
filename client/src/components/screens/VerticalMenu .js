import React from 'react';
import './sidebarlayout.css';
import { Link } from 'react-router-dom';

function VerticalMenu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ background: '#0b3548', position: "fixed", bottom: 0, float: "none", top: 0 }}>
     <Link to="/admin/dashboard" className="brand-link" style={{ padding: 'inherit', border: '0px !important', display: 'flex', justifyContent: 'center' }}>
        <div className="adminheaderimg">
        <img src={require('../imgs/logo.png').default} alt="Logo" />
        </div>
      </Link>

      <div className="sidebar" style={{ overflowY: 'auto' }}>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item"  style={{ color:"white"}}>
              <Link to="/admin/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p className='sidebarparagraph'>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fa fa-copy"></i>
                <p className='sidebarparagraph'>Manage Store <i className="right fas fa-angle-left"></i></p>
              </Link>
              <ul className="nav nav-treeview">
              <li className="nav-item">
                  <Link to="/admin/managestore" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>Store</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/admin/doctor" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>Patients List</p>
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="/admin/cardiology" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>Patients List</p>
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="/admin/managedoctors" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>Doctor</p>
                  </Link>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fa fa-copy"></i>
                <p className='sidebarparagraph'>Sales<i className="right fas fa-angle-left"></i></p>
              </Link>
              <ul className="nav nav-treeview">
              <li className="nav-item">
                  <Link to="/admin/orders" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/buymedicine" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>Medicinebuy</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/admin/doctor" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>Patients List</p>
                  </Link>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fa fa-copy"></i>
                <p className='sidebarparagraph'>CUSTOMERS<i className="right fas fa-angle-left"></i></p>
              </Link>
              <ul className="nav nav-treeview">
              <li className="nav-item">
                  <Link to="/admin/customers" className="nav-link">
                    <i className="far fa-circle nav-icon"></i> <p>All Customers</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li className="nav-item">
              <Link to="/admin/awards" className="nav-link">
                <i className="nav-icon fas fa-award"></i>
                <p className='sidebarparagraph'>Manage Awards</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/ourteam" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p className='sidebarparagraph'>Manage Team</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/career" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p className='sidebarparagraph'>Manage Bulk SMS</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fa fa-copy"></i>
                <p className='sidebarparagraph'>
                  Manage Meta
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/admin/metadetails" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p className='sidebarparagraph'>Manage Meta Details</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/admin/services/logout" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p className='sidebarparagraph'>Logout</p>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default VerticalMenu;