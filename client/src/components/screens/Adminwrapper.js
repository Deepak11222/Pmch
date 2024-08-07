import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import PageSubCategory from './PageSubCategory';
import Ourteam from './Ourteam';
import Addstore from './Addstore';
import AddDoctorForm from './AddDoctorForm';
import ManageStore from './ManageStore';
import Managedoctors from './Managedoctors';
import AddCardiology from './AddCardiology';
import ManageMedicine from './ManageMedicineStock';
import AddMedicine from './AddMedicine';
import ManageMedicineData from './ManageMedicineData';
import GenericNamesPage from './GenericNamesPage';
import MedicineCategoriesPage from './MedicineCategoriesPage';
import ManageMedicineTypes from './ManageMedicineTypes';
import AddMedicineType from './AddMedicineType';
import AddCategoryPage from './AddCategoryPage';
import AddGenericName from './AddGenericName';
import AddManufacturer from './Addmanufacturer';
import ManageManufacturer from './Managemanufacturer';
import StoreAdminDashboard from './StoreAdminDashboard';

const getPageName = (pathname) => {
  switch (pathname) {
    case '/admin/managestore':
      return 'Manage Store';
    case '/admin/manage-stock':
      return 'Manage Stock';
    case '/admin/pagesubcategory':
      return 'Page Sub Category';
    case '/admin/addstore':
      return 'Add Store';
    case '/admin/ourteam':
      return 'Our Team';
    case '/storeadmin/generic-name':
      return 'Generic Names';
    case '/storeadmin/addmedicine-category':
      return 'Add Medicine Category';
    case '/storeadmin/addgeneric-name':
      return 'Add Generic Name';
    case '/storeadmin/addmanufacturer':
      return 'Add Manufacturer';
    case '/storeadmin/medicine-type':
      return 'Manage Medicine Types';
    case '/storeadmin/manufacturer':
      return 'Manage Manufacturer';
    case '/storeadmin/addmedicine-type':
      return 'Add Medicine Type';
    case '/storeadmin/medicine-category':
      return 'Medicine Categories';
    case '/storeadmin/manage-stock':
      return 'Manage Medicine Stock';
    case '/storeadmin/manage-data':
      return 'Manage Medicine Data';
    case '/admin/add-cardiology':
      return 'Add Cardiology';
    case '/admin/cardiology':
      return 'Manage Cardiology';
    case '/admin/add-medicine':
      return 'Add Medicine';
      case '/admin/dashboard':
      return 'Dashboard';
    case '/admin/doctor':
      return 'Add Doctor';
    default:
      return 'Admin Dashboard';
  }
};

function AdminWrapper() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content-wrapper" style={{ minHeight: '628px' }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">{pageName}</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">{pageName}</li>
                    <li className="breadcrumb-item">
                      <span>{currentTime.toLocaleTimeString()}</span>
                    </li>
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
            <Route path="/storeadmin/dashboard" component={StoreAdminDashboard} />
            <Route path="/storeadmin/generic-name" component={GenericNamesPage} />
            <Route path="/storeadmin/addmedicine-category" component={AddCategoryPage} />
            <Route path="/storeadmin/addgeneric-name" component={AddGenericName} />
            <Route path="/storeadmin/addmanufacturer" component={AddManufacturer} />
            <Route path="/storeadmin/medicine-type" component={ManageMedicineTypes} />
            <Route path="/storeadmin/manufacturer" component={ManageManufacturer} />
            <Route path="/storeadmin/addmedicine-type" component={AddMedicineType} />
            <Route path="/storeadmin/medicine-category" component={MedicineCategoriesPage} />
            <Route path="/storeadmin/manage-stock" component={ManageMedicine} />
            <Route path="/storeadmin/manage-data" component={ManageMedicineData} />
            <Route path="/admin/add-store" component={Addstore} />
            <Route path="/storeadmin/add-medicine" component={AddMedicine} />
            <Route path="/admin/add-cardiology" component={AddCardiology} />
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

export default AdminWrapper;