import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTH_TOKEN, USER } from "../helpers/constant";
import { Avatar } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem(AUTH_TOKEN);
  const myCart = useSelector((state) => state.cart.cart);
  const user = JSON.parse(localStorage.getItem(USER)) || {};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full h-20 bg-white flex justify-between px-5 lg:px-24 items-center text-color-green shadow-navbar border-b-gray-100 border-b-2">
      <div className="flex justify-start items-center gap-7">
        <Link to="/">
          <img
            src="./assets/logo-pharmacy.png"
            alt=""
            className="logo-image mr-6"
          />
        </Link>
        <p>|</p>
        <Link to="/">
          <p className="text-lg hover:text-green-800 font-bold cursor-pointer">
            Home
          </p>
        </Link>
        <Link to="/forum">
          <p className="text-lg hover:text-green-800 font-bold cursor-pointer">
            Ask Question
          </p>
        </Link>
      </div>
      <div className="flex gap-7 items-center">
        <div className="w-8 hidden lg:block">
          <div
            className="relative hover:cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            {myCart.length === 0 ? null : (
              <p className="absolute -top-[10px] text-sm -right-[10px] font-bold bg-green-600 text-white rounded-full w-[65%] text-center">
                {myCart.length}
              </p>
            )}
            <svg
              className="hover:fill-green-400"
              fill={"none"}
              stroke="#009b90"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              // xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              ></path>
            </svg>
          </div>
        </div>
        {token && (
          <>
            <Menu>
              <MenuButton>
                <div className="flex items-center gap-4 ">
                  <Avatar
                    size="sm"
                    src={
                      user.profile_image
                        ? `${process.env.REACT_APP_API_BE}/${user.profile_image}`
                        : "https://bit.ly/broken-link"
                    }
                  />
                  <p className="font-bold">
                    {user.username ? user.username : ""}
                  </p>
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>
                  <p className="text-black">Logout</p>
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
        {!token && (
          <>
            <Link to={"/login"}>
              <Button className="border-button">
                <p>Login</p>
              </Button>
            </Link>
            <div className="hidden lg:block">
              <Link to={"/register"}>
                <Button className="button-primary">
                  <p className="text-sm">Register</p>
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
