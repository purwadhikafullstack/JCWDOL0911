import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing assets
import dropdown from "../assets/dropdown.svg";
import plus_address from "../assets/plus_address.svg";
import left_arrow from "../assets/left_arrow.svg";

//importing actions / reducers
import {
  getProvince,
  getCity,
  resetCity,
} from "../features/rajaongkir/rajaongkirSlice";
import { fetchUser, setUser } from "../features/users/userSlice";
import { newAddress } from "../features/users/userSlice";

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
  const [userPrimaryAddress, setUserPrimaryAddress] = useState("");
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [userNewAddress, setUserNewAddress] = useState("");
  const [userLabel, setUserLabel] = useState("");
  const [lastSelectedAddress, setLastSelectedAddress] = useState("0");
  const [isPrimary, setIsPrimary] = useState(false);
  const [userProvince, setUserProvince] = useState("");
  const [userCity, setUserCity] = useState("");

  const onClickAddressHandler = () => {
    setIsHidden((prev) => {
      return !prev;
    });
  };

  const onCityChangeHandler = (event) => {
    setUserCity(event.target.value);
    city.map((city) => {
      if (city.city_id == event.target.value) {
        setUserPostalCode(city.postal_code);
      }
    });
  };

  const onClickBackHandler = async (event) => {
    // console.log(lastSelectedAddress);
    setIsNewAddress((prev) => !prev);
    setUserFirstName(userData.address[lastSelectedAddress].first_name);
    setUserLastName(userData.address[lastSelectedAddress].last_name);
    setUserPhoneNumber(userData.address[lastSelectedAddress].phone_number);
    setUserPostalCode(userData.address[lastSelectedAddress].postal_code);
    setUserLabel(userData.address[lastSelectedAddress].label_address);

    if (userData.address[lastSelectedAddress].isprimary === 1) {
      const checkbox = document.getElementById("primary_address");
      console.log("primary");
      if (checkbox.checked === false) {
        checkbox.click();
        console.log("checkbox is unchecked");
      }
    } else {
      const checkbox = document.getElementById("primary_address");
      if (checkbox.checked === true) {
        checkbox.click();
        setIsPrimary(false);
        console.log("checkbox is unchecked");
      }
    }

    document.getElementById("province").value =
      userData.address[lastSelectedAddress].idprovince;
    await dispatch(getCity(userData.address[lastSelectedAddress].idprovince));
    document.getElementById("city").value =
      userData.address[lastSelectedAddress].idcity;
  };

  const onClickProvinceHandler = (event) => {
    setUserProvince(event.target.value);
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

  const changeUserLabelHandler = (event) => {
    setUserLabel(event.target.value);
  };

  const primaryChangeHandler = (event) => {
    setIsPrimary((prev) => !prev);
    console.log(isPrimary);
  };

  const addNewAddressHandler = (event) => {
    setIsNewAddress((prev) => !prev);
    setUserFirstName("");
    setUserLastName("");
    setUserPhoneNumber("");
    setUserPostalCode("");
    setUserLabel("");
    document.getElementById("primary_address").checked = false;
    setIsPrimary(false);
    document.getElementById("province").value = "default";
    document.getElementById("city").value = "default";
  };

  const changeAddressHandler = async (prop) => {
    console.log(prop.target.value);
    setLastSelectedAddress(prop.target.value);
    setUserFirstName(userData.address[prop.target.value].first_name);
    setUserLastName(userData.address[prop.target.value].last_name);
    setUserPhoneNumber(userData.address[prop.target.value].phone_number);
    setUserPostalCode(userData.address[prop.target.value].postal_code);
    setUserLabel(userData.address[prop.target.value].label_address);

    if (userData.address[prop.target.value].isprimary === 1) {
      const checkbox = document.getElementById("primary_address");
      console.log("primary");
      if (checkbox.checked === false) {
        checkbox.click();
        console.log("checkbox is unchecked");
      }
    } else {
      const checkbox = document.getElementById("primary_address");
      if (checkbox.checked === true) {
        checkbox.click();
        setIsPrimary(false);
        console.log("checkbox is unchecked");
      }
    }

    document.getElementById("province").value =
      userData.address[prop.target.value].idprovince;
    await dispatch(getCity(userData.address[prop.target.value].idprovince));
    document.getElementById("city").value =
      userData.address[prop.target.value].idcity;
    //Saat user change address
    // setUserFirstName(userData.address[event.target.value].idaddress);
    // document.getElementById("city").value = 50;
    // document.getElementById("city").innerHTML = "<option>COK</option>";
    // setUserPrimaryAddress(event.target.value);
  };

  const resetCityHandler = () => {
    dispatch(resetCity());
    setUserPostalCode("");
  };

  const saveAddress = () => {
    if (isNewAddress) {
      console.log("New address");
      // console.log({
      //   first_name: userFirstName,
      //   last_name: userLastName,
      //   phone_number: userPhoneNumber,
      //   label_address: userLabel,
      //   postal_code: userPostalCode,
      //   address: userNewAddress,
      //   isprimary: isPrimary,
      // });
      dispatch(
        newAddress({
          iduser: userData.iduser,
          first_name: userFirstName,
          last_name: userLastName,
          idprovince: userProvince,
          idcity: userCity,
          phone_number: userPhoneNumber,
          label_address: userLabel,
          postal_code: userPostalCode,
          address: userNewAddress,
          isprimary: isPrimary,
        })
      );
    } else {
      console.log("Not new address");
      console.log({
        idaddress: userData.address[lastSelectedAddress].idaddress,
        iduser: userData.iduser,
        first_name: userFirstName,
        last_name: userLastName,
        idprovince: userProvince,
        idcity: userCity,
        phone_number: userPhoneNumber,
        label_address: userLabel,
        postal_code: userPostalCode,
        isprimary: isPrimary,
      });
    }
    navigate("/order");
  };

  useEffect(() => {
    // if (userCart.length === 0) {
    //   alert("You need to select a product");
    //   //harusnya navigate ke product list!
    //   navigate("/cart");
    // } else {
    const setUpPrimaryUserData = async () => {
      setUserFirstName(userData.address[0].first_name);
      setUserLastName(userData.address[0].last_name);
      setUserPhoneNumber(userData.address[0].phone_number);
      setUserPostalCode(userData.address[0].postal_code);
      setUserLabel(userData.address[0].label_address);

      if (userData.address[0].isprimary === 1) {
        const checkbox = document.getElementById("primary_address");
        console.log("primary");
        if (checkbox.checked === false) {
          checkbox.click();
          console.log("checkbox is unchecked");
        }
      } else {
        const checkbox = document.getElementById("primary_address");
        if (checkbox.checked === true) {
          checkbox.click();
          setIsPrimary(false);
          console.log("checkbox is unchecked");
        }
      }

      await dispatch(getProvince());
      document.getElementById("province").value =
        userData.address[0].idprovince;
      await dispatch(getCity(userData.address[0].idprovince));
      document.getElementById("city").value = userData.address[0].idcity;

      // console.log(userData.address[0].idprovince);
      // console.log(userData.address[0].idcity);
      // console.log(document.getElementById("province").value);
    };

    setUpPrimaryUserData().catch(console.error);

    // }
  }, []);

  useEffect(() => {
    if (!isNewAddress) {
      document.getElementById("address").value = lastSelectedAddress;
    }
  }, [isNewAddress]);

  return (
    <div className="w-full">
      <div className="sm:w-[50%] w-[80%] mx-auto whitespace-nowrap text-3xl tracking-wide font-bold font-roboto pt-20">
        Alamat Pengiriman
      </div>
      <div className="sm:w-[50%] w-[80%] mx-auto sm:pt-20 pt-10">
        <label className="text-[20px] font-bold" htmlFor="label_address">
          Label Address
        </label>
        <input
          id="label_address"
          type="text"
          onChange={changeUserLabelHandler}
          value={userLabel}
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
              <option
                onClick={resetCityHandler}
                selected="selected"
                value="default"
              >
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
              <option onClick={() => setUserPostalCode("")} value="default">
                Select City
              </option>
              {city.map((val, index) => {
                return (
                  <option
                    key={val.city_id}
                    onClick={onCityChangeHandler}
                    value={val.city_id}
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
          <label htmlFor="useraddress">Address</label>
          {!isNewAddress ? (
            <>
              <div className="w-full hidden flex flex-row items-center">
                <input
                  id="useraddress"
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
              <select
                id="address"
                className="bg-white border border-2 mt-4 border-gray-300 text-sm rounded-lg w-full p-3 focus:ring-green-500 focus:border-green-500"
              >
                {userData.address.map((val, index) => {
                  return (
                    <option
                      onClick={(prop) => changeAddressHandler(prop)}
                      key={index}
                      value={index}
                    >
                      {val.address}
                    </option>
                  );
                })}
              </select>

              <div
                onClick={addNewAddressHandler}
                className=" flex flex-row w-[35%] h-[40px] border-2 border-gray-300 rounded rounded-full ml-2 mt-4 hover:bg-green-400 hover:border-green-400 hover:shadow-xl"
              >
                <button className="flex flex-row gap-4 my-auto mx-auto">
                  <div className="w-[25px] h-[25px]">
                    <div>
                      <img src={plus_address} alt="plus" />
                    </div>
                  </div>
                  <div>Add new address</div>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <input
                  id="new_address"
                  placeholder="Enter your new address"
                  type="text"
                  onChange={(e) => setUserNewAddress(e.target.value)}
                  value={userNewAddress}
                  className="rounded-md border-2 sm:pl-4 pl-2 focus:outline-none mt-4 h-[40px] border-slate-300 focus:border-green-500"
                />
              </div>
              <div className=" flex flex-row w-[20%] h-[40px] items-center border-2 border-gray-300 rounded rounded-full ml-2 mt-4 hover:bg-green-400 hover:border-green-400 hover:shadow-xl">
                <button
                  onClick={onClickBackHandler}
                  className="flex flex-row gap-2 my-auto mx-auto"
                >
                  <div className="w-[25px] h-[25px]">
                    <div>
                      <img src={left_arrow} alt="left_arrow" />
                    </div>
                  </div>
                  <div>Back</div>
                </button>
              </div>
            </>
          )}
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
          <input
            onClick={primaryChangeHandler}
            className="w-4 h-4"
            id="primary_address"
            type="checkbox"
          />
          <label htmlFor="primary_address">Save as primary address</label>
        </div>
        <div className="flex flex-row w-full gap-6 mb-20">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 rounded-md border-2 border-gray-300 h-10 hover:border-green-500 hover:shadow-xl hover:bg-green-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={saveAddress}
            className="flex-1 rounded-md border-2 border-gray-300 h-10 hover:border-green-500 hover:shadow-xl hover:bg-green-500 hover:text-white"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default Address;
