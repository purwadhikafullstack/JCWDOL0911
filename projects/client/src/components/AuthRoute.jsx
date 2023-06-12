import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN } from "../helpers/constant";

function AuthRoute() {
  if (localStorage.getItem(AUTH_TOKEN)) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthRoute;
