import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authToken } from "../helpers/constant";

function AuthRoute() {
  if (localStorage.getItem(authToken)) {
    return <Navigate to="/test" replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthRoute;
