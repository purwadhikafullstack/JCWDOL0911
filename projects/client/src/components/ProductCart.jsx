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
  decreaseProductQuantity,
  removeProduct,
  addCheckedProduct,
  removeCheckedProduct,
} from "../features/cart/cartSlice";

//importing assets
import trash from "../assets/trash.png";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import medicine from "../assets/medicine.svg";

function ProductCart() {
  const [total, setTotal] = useState(0);
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();

  const myCart = useSelector((state) => state.cart.cart);

  const checkHandler = (item, index) => {
    const checkBox = document.getElementById(item.idproduct);
    if (checkBox.checked) {
      dispatch(addCheckedProduct(index));
      setTotal((prev) => prev + myCart[index].quantity * myCart[index].price);
    } else {
      dispatch(removeCheckedProduct(index));
      setTotal((prev) => prev - myCart[index].quantity * myCart[index].price);
    }
  };

  const addProductButtonHandler = (index, item) => {
    const checkBox = document.getElementById(item.idproduct);
    if (checkBox.checked) {
      setTotal((prev) => prev + item.price);
      dispatch(addProductQuantity(index));
    } else {
      dispatch(addProductQuantity(index));
    }
  };

  const decreaseProductButtonHandler = (index, item) => {
    const checkBox = document.getElementById(item.idproduct);
    if (checkBox.checked) {
      setTotal((prev) => prev - item.price);
      dispatch(decreaseProductQuantity(index));
    } else {
      dispatch(decreaseProductQuantity(index));
    }
  };

  const removeProductHandler = (index, item) => {
    const checkBox = document.getElementById(item.idproduct);
    if (checkBox.checked) {
      setTotal((prev) => prev - item.price * item.quantity);
      dispatch(removeProduct(index));
    } else {
      dispatch(removeProduct(index));
    }
  };

  const allCheckHandler = () => {
    setIsChecked((prev) => !prev);
    if (isChecked) {
      myCart.map((val) => {
        const checkBox = document.getElementById(val.idproduct);
        if (!checkBox.checked) {
          checkBox.click();
        }
        return null;
      });
    } else {
      myCart.map((val) => {
        const checkBox = document.getElementById(val.idproduct);
        if (checkBox.checked) {
          checkBox.click();
        }
        return null;
      });
    }
  };

  useEffect(() => {
    dispatch(setTotalPrice(total));
  }, [total]);

  return (
    <>
      {myCart.length !== 0 ? (
        <>
          <div className="shadow-xl rounded-xl">
            <div className="flex flex-row items-center gap-4 mt-4 w-[100%] pl-6 pt-6">
              <input
                onClick={allCheckHandler}
                id="all_checkBox"
                type="checkbox"
                value={isChecked}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              ></input>
              <div>Select All</div>
            </div>
            <div className=" pt-4 w-full h-[25px]">
              <hr />
            </div>
            {myCart.map((item, index) => {
              return (
                <div
                  key={item.idproduct}
                  className=" w-[100%] h-[200px] py-4 border-b-black pl-4"
                >
                  <div className="flex flex-row relative h-full">
                    <div className="flex">
                      <div className="flex items-center mb-4 pl-3">
                        <input
                          onClick={(e) => {
                            checkHandler(item, index);
                          }}
                          id={item.idproduct}
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        ></input>
                        <label
                          htmlFor="default-checkbox"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        ></label>
                      </div>
                      <img
                        src={item.product_image || medicine}
                        className=" object-contain w-[200px] h-full"
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
                      <div className="flex flex-row  mx-4 items-center">
                        <img
                          className="sm:absolute bottom-4 right-[160px] w-[23px] h-[23px] mx-6 cursor-pointer"
                          onClick={() => removeProductHandler(index, item)}
                          src={trash}
                          alt="trashbin"
                        />
                        <button
                          onClick={() => addProductButtonHandler(index, item)}
                          className=" bg-green-600 sm:absolute w-[40px] h-[25px] sm:bottom-4 sm:right-[125px] rounded-tl-sm rounded-bl-sm hover:bg-green-500"
                        >
                          <img
                            src={plus}
                            alt="Plus"
                            className="w-[15px] mx-auto"
                          />
                        </button>
                        <span className="sm:absolute sm:bottom-4 sm:right-[75px] border-l-2 border-green-600 border-r-2 text-center w-[50px] h-[25px] bg-green-600 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            decreaseProductButtonHandler(index, item)
                          }
                          className=" bg-green-600 sm:absolute w-[40px] h-[25px] sm:bottom-4 sm:right-[35px] rounded-tr-sm rounded-br-sm hover:bg-green-500   "
                        >
                          <img
                            src={minus}
                            alt="Minus"
                            className="w-[20px] mx-auto "
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
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

export default ProductCart;
