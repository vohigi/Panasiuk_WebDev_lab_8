import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  userId,
  setAuthRedirectPath,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!userId) {
        // not logged in so redirect to login page with the return url
        //setAuthRedirectPath(props.location);
        return <Redirect to={{ pathname: "/login" }} />;
      }

      // check if route is restricted by role
      // if (roles && roles.indexOf(currentUser.employeeType) === -1) {
      //     // role not authorised so redirect to home page
      //     return <Redirect to={{ pathname: '/'}} />
      // }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
