import React from "react";
import { useSelector, useDispatch } from "react-redux";
import check from "../assets/check.svg";
import { removeAddress, setNewPrimary } from "../features/users/addressSlice";

function ChangeAddressModal({ modalHandler }) {
  const dispatch = useDispatch();
  //get globalstate of user address
  const userAddresses = useSelector(
    (state) => state.address.addressList.allAddress
  );

  ///get userprofile
  const userProfile = useSelector((state) => state.user.user);

  //when user want to use the selected address
  const onClickUseAddressHandler = (idAddress) => {
    dispatch(setNewPrimary(idAddress));
    modalHandler();
  };

  //when user want to delete address
  const deleteAddressHandler = (idAddress) => {
    dispatch(removeAddress(idAddress));
    modalHandler();
  };

  return (
    <>
      <div className=" w-[90%] rounded-xl shadow-xl">
        <div className="w-full h-full absolute top-0 left-0 bg-opacity-25 backdrop-blur-sm">
          <div className="bg-white border-4 border-gray-600 rounded-xl sm:w-[70%] w-[90%] mx-auto mt-60">
            <div className="sm:w-[90%] w-[90%] mx-auto whitespace-nowrap text-3xl tracking-wide font-bold font-roboto pt-10">
              Address List
            </div>
            <hr className=" mt-4" />
            {userAddresses.map((address) => {
              return (
                <>
                  <div
                    key={address.idaddress}
                    className="sm:w-[90%] w-[90%] mx-auto pt-10 flex flex-row justify-between pb-10 items-center gap-10"
                  >
                    <div className="text-[20px] sm:w-[70%]">
                      <div className="font-bold">
                        {userProfile.full_name || userProfile.username}
                        {", "}
                        <span>{userProfile.phone_number}</span>
                      </div>
                      <div>{address.street}</div>
                      <div>
                        <span>
                          {address.district ? `${address.district}, ` : null}
                        </span>
                        <span>
                          {address.city_name ? `${address.city_name}, ` : null}
                        </span>
                        <span>{null || `${address.province}, `}</span>
                        <span>{null || address.postal_code}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col xl:flex-row flex-col md:gap-4 gap-6">
                      <button
                        onClick={() =>
                          onClickUseAddressHandler(address.idaddress)
                        }
                        className="bg-green-500 xl:w-[full] md:w-[100%] w-full md:block hidden  hover:bg-green-700 whitespace-nowrap text-white font-bold py-2 px-4 rounded"
                      >
                        Use Address
                      </button>
                      <button
                        onClick={() => deleteAddressHandler(address.idaddress)}
                        className="bg-red-500 xl:w-[full] md:w-[100%] w-full md:block hidden hover:bg-red-700 whitespace-nowrap text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          onClickUseAddressHandler(address.idaddress)
                        }
                        className="md:hidden w-[30px] hover:stroke-green-500"
                      >
                        <img
                          src={check}
                          alt="check"
                          className="hover:stroke-green-500"
                        />
                      </button>
                      <button
                        onClick={() => deleteAddressHandler(address.idaddress)}
                        className="md:hidden w-[30px]"
                      >
                        <svg
                          className="hover:fill-red-600"
                          fill="#000000"
                          viewBox="0 0 32 32"
                          version="1.1"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>trash-bin</title>{" "}
                            <path d="M2.016 8q0 0.832 0.576 1.44t1.408 0.576v16q0 2.496 1.76 4.224t4.256 1.76h12q2.464 0 4.224-1.76t1.76-4.224v-16q0.832 0 1.408-0.576t0.608-1.44-0.608-1.408-1.408-0.576h-5.984q0-2.496-1.76-4.256t-4.256-1.76-4.256 1.76-1.728 4.256h-6.016q-0.832 0-1.408 0.576t-0.576 1.408zM8 26.016v-16h16v16q0 0.832-0.576 1.408t-1.408 0.576h-12q-0.832 0-1.44-0.576t-0.576-1.408zM10.016 26.016h1.984v-14.016h-1.984v14.016zM14.016 26.016h4v-14.016h-4v14.016zM14.016 6.016q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408h-4zM20 26.016h2.016v-14.016h-2.016v14.016z"></path>{" "}
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeAddressModal;
