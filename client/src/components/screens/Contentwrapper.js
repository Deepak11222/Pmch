import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import PageSubCategory from './PageSubCategory';
import Ourteam from './Ourteam';
import Addstore from './Addstore';
import AddDoctorForm from './AddDoctorForm';
import ManageStore from './ManageStore';
import Managedoctors from './Managedoctors';
import Orders from './Orders';
import OrderInfo from './OrderInfo';
import Superadmindashboard from './Superadmindashboard';
import UserList from './UserList';
import MedicinePurchaseForm from './MedicinePurchaseForm ';

const getPageName = (pathname) => {
  switch (pathname) {
    case '/admin/managestore':
      return 'Manage Store';
    case '/admin/pagesubcategory':
      return 'Page Sub Category';
    case '/admin/addstore':
      return 'Add Store';
    case '/admin/ourteam':
      return 'Our Team';
    case '/admin/orders':
      return 'Orders';
    case '/admin/customers':
      return 'Customers';
    case '/admin/dashboard':
      return 'SuperAdmin Dashboard'; // Title for the dashboard route
    default:
      if (pathname.startsWith('/admin/orderinfo')) {
        return 'Order Information'; // or whatever title you set in OrderInfo
      }
      return 'SuperAdmin Dashboard'; // Default title
  }
};

function ContentWrapper() {
  const [pageTitle, setPageTitle] = useState('SuperAdmin Dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if the current path is for the dashboard
  const isDashboard = location.pathname === '/admin/dashboard';

  return (
    <div className="content-wrapper" style={{ minHeight: '628px' }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">
                  {isDashboard ? 'SuperAdmin Dashboard' : pageName}
                </h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    {isDashboard ? (
                      <li className="breadcrumb-item">
                        <span>{currentTime.toLocaleTimeString()}</span>
                      </li>
                    ) : (
                      <>
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Home</a>
                        </li>
                        <li className="breadcrumb-item active">{pageName}</li>
                      </>
                    )}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <Switch>
            <Route path="/admin/dashboard" component={Superadmindashboard} />
            <Route path="/admin/buymedicine" component={MedicinePurchaseForm} />
            <Route path="/admin/customers" component={UserList} />
            <Route
              exact
              path="/admin/orderinfo/:orderId"
              render={(props) => (
                <OrderInfo {...props} setPageTitle={setPageTitle} />
              )}
            />
            <Route path="/admin/pagesubcategory" component={PageSubCategory} />
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/add-store" component={Addstore} />
            <Route path="/admin/managestore" component={ManageStore} />
            <Route path="/admin/managstore" component={Managedoctors} />
            <Route path="/admin/doctor" component={AddDoctorForm} />
            <Route path="/admin/ourteam" component={Ourteam} />
            {/* Add more routes as needed */}
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default ContentWrapper;