import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/users/userSlice";
import { fetchAddresses } from "../features/users/addressSlice";


function LayoutWithNavbar() {
  const userId = JSON.parse(localStorage.getItem('user'))?.iduser;
  const dispatch = useDispatch()
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser())
      dispatch(fetchAddresses())
      
    }
    
  })
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayoutWithNavbar;
