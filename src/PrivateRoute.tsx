import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { UserContext } from "Context/AuthContext";

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { token } = React.useContext(UserContext);

  return <Route
    {...rest}
    render={({ location }) => token !== '' ? (children)
      :
      (<Redirect to={{ pathname: "/login", state: { from: location } }} />)} />
};