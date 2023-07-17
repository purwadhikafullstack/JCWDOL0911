import React, {useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN, USER } from "../helpers/constant";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchAddresses } from "../features/users/addressSlice";
import { fetchPrimaryAddress } from "../features/users/addressSlice";
import { addToCartFromLocal } from "../features/cart/cartSlice";

function PrivateRoute() {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem(USER))?.iduser;
  const userCart = JSON.parse(localStorage.getItem("myCart")) || [];

  if (!localStorage.getItem(AUTH_TOKEN) || !userId) {
    Swal.fire({
      icon: "warning",
      title: "Please login first!",
    });

    return <Navigate to="/login" replace={true} />;
  }
  dispatch(addToCartFromLocal(JSON.parse(localStorage.getItem("myCart"))));
  return <Outlet />;
}

export default PrivateRoute;
