import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//take cart globalstate
import { useSelector } from "react-redux";

//import helper
import { currency } from "../helpers/currency";

//import actions from cartSlice
import {
  setTotalPrice,
  addProductQuantity,
  addProduct,
  decreaseProductQuantity,
  removeProduct,
  addCheckedProduct,
  removeCheckedProduct,
} from "../features/cart/cartSlice";

//importing assets

import medicine from "../assets/medicine.svg";

function OrderProductCart() {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const myCart = useSelector((state) => state.cart.cart);

  const addProductButtonHandler = (index, item) => {
    const checkBox = document.getElementById(item.idproduct);
    if (checkBox.checked) {
      setTotal((prev) => prev + item.price);
      dispatch(addProductQuantity(index));
    } else {
      dispatch(addProductQuantity(index));
    }
  };

  useEffect(() => {
    dispatch(setTotalPrice(total));
  }, [total]);

  return (
    <>
      {myCart.length !== 0 ? (
        <div>
          <div className="shadow-xl rounded-xl">
            <div className=" w-[100%] h-[200px] py-4 border-b-black pl-4">
              lorem
            </div>
          </div>
          <div className="shadow-xl rounded-xl mt-10">
            {myCart.map((item, index) => {
              return (
                <div
                  key={item.idproduct}
                  className=" w-[100%] h-[200px] py-4 border-b-black pl-4"
                >
                  <div className="flex flex-row relative h-full">
                    <div className="flex">
                      <div className="flex items-center mb-4 pl-3">
                        <label
                          htmlFor="default-checkbox"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        ></label>
                      </div>
                      <img
                        src={item.product_image || medicine}
                        className=" object-contain w-[200px] h-[200px] h-full"
                        alt="testing"
                      />
                    </div>
                    <div className="flex sm:flex-row sm:gap-4 ml-10 flex-col w-full mt-10 mb-3 justify-between">
                      <div className="flex sm:flex-row flex-col justify-between gap-4 w-full ml-4">
                        <div>
                          <p>{item.name}</p>
                          <p className="text-xs">1 Botol</p>
                        </div>
                        <p className="font-bold whitespace-nowrap">
                          {currency(item.price)}
                        </p>
                      </div>
                      <div className="flex flex-row mx-4 items-center">
                        <button
                          onClick={() => addProductButtonHandler(index, item)}
                          className=" sm:absolute w-[80px] h-[25px] sm:bottom-4 sm:right-[125px] rounded-tl-sm rounded-bl-sm hover:bg-green-500"
                        >
                          Quantity :
                        </button>
                        <span className="sm:absolute sm:bottom-4 sm:right-[75px] text-center w-[50px] h-[25px]">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="text-center md:py-10 py-20">
            <div className="text-2xl font-bold">Please select a product</div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderProductCart;
