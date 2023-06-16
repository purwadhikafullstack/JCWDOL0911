import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN, USER } from "../helpers/constant";
import Swal from "sweetalert2";

function PrivateRoute() {
  const userId = JSON.parse(localStorage.getItem(USER))?.iduser;

  if (!localStorage.getItem(AUTH_TOKEN) || !userId) {
    Swal.fire({
      icon: "warning",
      title: "Please login first!",
    });

    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
