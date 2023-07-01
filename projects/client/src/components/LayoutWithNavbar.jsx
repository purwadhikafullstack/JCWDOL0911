import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/users/userSlice";
import {
  fetchAddresses,
  fetchPrimaryAddress,
} from "../features/users/addressSlice";
import { fetchTransaction } from "../features/transaction/transactionSlice";

function LayoutWithNavbar() {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"))?.iduser;

  useEffect(() => {
    if (userId) {
      dispatch(fetchTransaction());
      dispatch(fetchUser());
      dispatch(fetchAddresses());
      dispatch(fetchPrimaryAddress(userId));
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayoutWithNavbar;
