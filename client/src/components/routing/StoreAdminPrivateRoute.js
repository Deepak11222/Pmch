import { Redirect, Route } from "react-router-dom";

const StoreAdminPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("storeAuthToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/storeadmin/login" />
        )
      }
    />
  );
};

export default StoreAdminPrivateRoute;
