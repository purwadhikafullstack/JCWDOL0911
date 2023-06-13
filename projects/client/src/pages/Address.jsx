import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing assets
import dropdown from "../assets/dropdown.svg";

//importing actions / reducers
import {
  getProvince,
  getCity,
  resetCity,
} from "../features/rajaongkir/rajaongkirSlice";
import { fetchUser, setUser } from "../features/users/userSlice";

//importing component
import Test from "../components/Test";

function Address() {
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.focus();
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const userCart = useSelector((state) => state.cart.cart);
  const province = useSelector((state) => state.rajaongkir.province);
  const city = useSelector((state) => state.rajaongkir.city);

  const [isHidden, setIsHidden] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPostalCode, setUserPostalCode] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [userPrimaryAddress, setUserPrimaryAddress] = useState("");

  const onClickAddressHandler = () => {
    setIsHidden((prev) => {
      return !prev;
    });
  };

  const onClickProvinceHandler = (event) => {
    dispatch(getCity(event.target.value));
  };

  const userPhoneNumberHandler = (event) => {
    setUserPhoneNumber(event.target.value);
  };

  const userFirstNameHandler = (event) => {
    setUserFirstName(event.target.value);
  };

  const userLastNameHandler = (event) => {
    setUserLastName(event.target.value);
  };

  const userPostalCodeHandler = (event) => {
    setUserPostalCode(event.target.value);
  };

  const resetCityHandler = () => {
    dispatch(resetCity());
    setUserPostalCode("");
  };

  useEffect(() => {
    // if (userCart.length === 0) {
    //   alert("You need to select a product");
    //   //harusnya navigate ke product list!
    //   navigate("/cart");
    // } else {

    dispatch(getProvince());
    // }
  }, []);

  useEffect(() => {
    setUserPhoneNumber(userData.phone_number || "");
    setUserFirstName(userData.fullname ? userData.fullname.split(" ")[0] : "");
    setUserLastName(
      userData.fullname
        ? userData.fullname.split(" ")[userData.fullname.split(" ").length - 1]
        : ""
    );
    setUserAddress(userData.address || []);
  }, [userData]);

  return (
    <div className="w-full">
      <div className="sm:w-[50%] w-[80%] mx-auto whitespace-nowrap text-3xl tracking-wide font-bold font-roboto pt-20">
        Alamat Pengiriman
      </div>
      <div className="sm:w-[50%] w-[80%] mx-auto sm:pt-20 pt-10">
        <label className="text-[20px] font-bold" htmlFor="address">
          Label Address
        </label>
        <input
          id="address"
          type="text"
          required
          placeholder="Example: Apartment, Condo, etc."
          className="rounded-md focus:outline-none sm:pl-4 pl-2 border-2 mt-4 h-[40px] w-full border-slate-300 focus:border-green-500"
        />
      </div>
      <div className="sm:w-[50%] w-[80%] mx-auto sm:pt-20 pt-10">
        <label className="text-[20px] font-bold" htmlFor="info">
          Customer Info
        </label>
        <div className="flex flex-row w-full gap-6 items-center mt-5">
          <div className="flex flex-col flex-1">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              onChange={userFirstNameHandler}
              value={userFirstName}
              placeholder="Example: John"
              className="rounded-md sm:pl-4 pl-2 border-2 focus:outline-none mt-4 w-full h-[40px] border-slate-300 focus:border-green-500"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              placeholder="Example: Smith"
              onChange={userLastNameHandler}
              value={userLastName}
              type="text"
              className="rounded-md w-full focus:outline-none sm:pl-4 pl-2 border-2 mt-4 h-[40px] border-slate-300  focus:border-green-500"
            />
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            id="phone_number"
            placeholder="Enter your phone number"
            type="text"
            onChange={userPhoneNumberHandler}
            value={userPhoneNumber}
            className="rounded-md border-2 sm:pl-4 pl-2 focus:outline-none mt-4 h-[40px] border-slate-300 focus:border-green-500"
          />
        </div>
        <div className="flex flex-row w-full gap-6 items-center mt-5">
          <div className="flex flex-col flex-1">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              className="bg-white border border-2 mt-4 border-gray-300 text-sm rounded-lg w-full p-3 focus:ring-green-500 focus:border-green-500"
            >
              <option onClick={resetCityHandler} value="">
                Select Province
              </option>
              {province.map((val) => {
                return (
                  <option
                    key={val.province_id}
                    onClick={onClickProvinceHandler}
                    value={val.province_id}
                    className="hover:bg-green-200"
                  >
                    {val.province}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="city">City / State</label>
            <select
              id="city"
              className="bg-white border border-2 mt-4 border-gray-300 text-sm rounded-lg w-full p-3 focus:ring-green-500 focus:border-green-500"
            >
              <option onClick={() => setUserPostalCode("")} value="">
                Select City
              </option>
              {city.map((val, index) => {
                return (
                  <option
                    key={val.city_id}
                    onClick={(e) => setUserPostalCode(e.target.value)}
                    value={val.postal_code}
                    className="hover:bg-green-200"
                  >
                    {val.city_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col relative mt-10">
          <label htmlFor="address">Address</label>
          <div className="w-full flex flex-row items-center">
            <input
              id="address"
              type="text"
              placeholder="Enter your address"
              className="rounded-tl-md flex-1 rounded-bl-md focus:outline-none border-2 border-r-0 mt-4 h-[40px] sm:pl-4 pl-2 border-slate-300 focus:border-green-500 focus:border-r-0"
            />
            <button className="border-2 border-gray-300 mt-4 h-[40px] rounded-tr-md rounded-br-md">
              <img
                src={dropdown}
                alt="dropdown"
                className="h-[30px] w-[30px]"
                onClick={onClickAddressHandler}
              />
            </button>
          </div>
          <div
            className={`mt-2 absolute top-20 w-full ${
              isHidden ? `` : `hidden`
            }`}
          >
            <ul className="border-2 border-green-500 bg-white rounded-sm ">
              {/* {userAddress.map((val, index) => {
                if (val.isprimary === 1) {
                  setUserAddress(val.address);
                } else {
                  return (
                    <li key={index} className="py-1 hover:bg-green-200 px-2">
                      {val.address}
                    </li>
                  );
                }
              })} */}
            </ul>
          </div>
        </div>
        <div className="flex flex-row w-full gap-6 items-center mt-10">
          <div className="flex flex-col w-[50%]">
            <label htmlFor="postal_code">Postal Code</label>
            <input
              id="postal_code"
              placeholder="Enter your postal code"
              type="text"
              onChange={userPostalCodeHandler}
              value={userPostalCode}
              className="rounded-md border-2 sm:pl-4 pl-2 focus:outline-none mt-4 h-[40px] border-slate-300 focus:border-green-500"
            />
          </div>
        </div>
        <div className="flex flex-row w-full gap-3 items-center my-10">
          <input className="w-4 h-4" id="primary_address" type="checkbox" />
          <label htmlFor="primary_address">Save as primary address</label>
        </div>
        <div className="flex flex-row w-full gap-6 mb-20">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 rounded-md border-2 border-gray-300 h-10 hover:border-green-500 hover:shadow-xl hover:bg-green-500 hover:text-white"
          >
            Cancel
          </button>
          <button className="flex-1 rounded-md border-2 border-gray-300 h-10 hover:border-green-500 hover:shadow-xl hover:bg-green-500 hover:text-white">
            Save Address
          </button>
        </div>
        <Test props={{ label: "1234" }} ref={ref} />
        <button onClick={handleClick}>Click This</button>
      </div>
    </div>
  );
}

export default Address;
