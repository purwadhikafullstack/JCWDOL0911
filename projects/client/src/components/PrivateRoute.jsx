import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN, USER } from "../helpers/constant";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/users/userSlice";
import { fetchAddresses } from "../features/users/addressSlice";

function PrivateRoute() {
  const userId = JSON.parse(localStorage.getItem(USER))?.iduser;
  const dispatch = useDispatch()
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser())
      dispatch(fetchAddresses())
      
    }
    
  })
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
