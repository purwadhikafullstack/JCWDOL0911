import React, { useState, useEffect } from "react";
import OrderListCard from "../components/orderlist/OrderListCard";
import ProfileOrderCard from "../components/orderlist/ProfileOrderCard";
import trash from "../assets/trash.png";

function OrderList() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const onClickOrderHandler = () => {
    setIsOrderOpen(true);
    setIsProfileOpen(false);
  };

  const onClickProfileHandler = () => {
    setIsProfileOpen(true);
    setIsOrderOpen(false);
  };

  useEffect(() => {
    setIsOrderOpen(true);
  }, []);

  return (
    <div className="w-full my-20">
      <div className="flex md:flex-row flex-col justify-between mx-10 gap-10">
        <div className="lg:w-[20%] md:w-[30%] w-[100%]">
          <div className="flex flex-row justify-start gap-16 items-center w-[80%] mx-auto my-8">
            <img
              className="w-[40px] h-[40px] rounded rounded-full"
              src={trash}
              alt="trash"
            />
            <div className="font-bold md:text-[16px] text-xl">Jane Doe</div>
          </div>
          <hr />
          <div className="w-full flex flex-col rounded shadow-xl">
            <div
              onClick={onClickProfileHandler}
              className="w-full hover:bg-green-500 hover:cursor-pointer py-4 hover:text-white transition duration-200 ease-out hover:ease-in"
            >
              <button className="flex flex-row items-center  gap-16 w-[80%] mx-auto">
                <img
                  className="w-[40px] h-[40px] rounded rounded-full"
                  src={trash}
                  alt="trash"
                />
                <div className="md:text-[16px] text-xl">Profile</div>
              </button>
            </div>
            <div
              onClick={onClickOrderHandler}
              className="w-full hover:bg-green-500 hover:cursor-pointer py-4 hover:text-white transition duration-200 ease-out hover:ease-in"
            >
              <button className="flex flex-row items-center gap-16 w-[80%] mx-auto">
                <img
                  className="w-[40px] h-[40px] rounded rounded-full"
                  src={trash}
                  alt="trash"
                />
                <div className="md:text-[16px] text-xl">Order</div>
              </button>
            </div>
            <div className="w-full hover:bg-green-500 hover:cursor-pointer py-4 hover:text-white transition duration-200 ease-out hover:ease-in">
              <button className="flex flex-row items-center gap-16 w-[80%] mx-auto">
                <img
                  className="w-[40px] h-[40px] rounded rounded-full"
                  src={trash}
                  alt="trash"
                />
                <div className="md:text-[16px] text-xl">Address</div>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] md:w-[70%] w-full">
          {isOrderOpen ? <OrderListCard /> : null}
          {isProfileOpen ? <ProfileOrderCard /> : null}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
