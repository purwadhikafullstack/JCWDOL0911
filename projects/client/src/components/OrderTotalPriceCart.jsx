import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { currency } from "../helpers/currency";

function OrderTotalPriceCart() {
  const cartProduct = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className=" w-[90%] rounded-xl shadow-xl">
      <div className="text-xl ml-6 font-bold pt-6">Payment Summary</div>
      <div className="flex flex-col gap-4 justify-between mx-6 mt-4">
        <div className="flex flex-row justify-between ">
          <div>Total Price</div>
          <div>{currency(totalPrice.totalPrice)}</div>
        </div>
        <div className="flex flex-row justify-between ">
          <div>Freight Cost</div>
          <div>{currency(totalPrice.totalPrice)}</div>
        </div>
      </div>
      <hr className="border-gray-300 my-4" />
      <div className="flex flex-row justify-between mx-6">
        <div className="font-bold">Total Payment</div>
        <div>{currency(totalPrice.totalPrice)}</div>
      </div>

      <div className="w-full flex items-center my-10">
        {cartProduct.length ? (
          <button
            className=" disabled:bg-gray-300 disabled:hover:shadow-none hover:bg-green-500 hover:shadow-xl w-[80%] mx-auto rounded-md border-none text-white bg-green-700 h-[40px]"
            onClick={() => navigate("/address")}
          >
            Pay
          </button>
        ) : (
          <button
            disabled
            className=" disabled:bg-gray-300 disabled:hover:shadow-none hover:bg-green-500 hover:shadow-xl w-[80%] mx-auto rounded-md border-none text-white bg-green-700 h-[40px]"
            onClick={() => navigate("/address")}
          >
            Pay
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderTotalPriceCart;
