import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full h-20 bg-white flex justify-between px-5 lg:px-24 items-center text-color-green shadow-navbar border-b-gray-100 border-b-2">
      <img src="./assets/logo-pharmacy.png" alt="" className="logo-image" />

      <div className="flex gap-7 items-center">
        <div className="w-8 hidden lg:block">
          <svg
            fill="none"
            stroke="#009b90"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            ></path>
          </svg>
        </div>
        <Button className="border-button">
          <p>Login</p>
        </Button>
        <div className="hidden lg:block">
          <Link to={"/register"}>
            <Button className="button-primary">
              <p className="text-sm">Register</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
