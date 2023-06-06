import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//take cart globalstate
import { useSelector } from "react-redux";

//import actions from cartSlice
import {
  setTotalPrice,
  addProductQuantity,
  addProduct,
  decreaseProductQuantity,
} from "../features/cart/cartSlice";

function ProductCart() {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const myCart = useSelector((state) => state.cart.cart);

  const checkHandler = (item, index) => {
    const checkBox = document.getElementById(item.idproduct);
    checkBox.checked
      ? setTotal((prev) => prev + myCart[index].quantity * myCart[index].price)
      : setTotal((prev) => prev - myCart[index].quantity * myCart[index].price);
  };

  const addProductButtonHandler = (index, item) => {
    const checkBox = document.getElementById(item.idproduct);
    if (checkBox.checked) {
      setTotal((prev) => prev + myCart[index].price);
      dispatch(addProductQuantity(index));
    } else {
      dispatch(addProductQuantity(index));
    }
  };

  const removeProductButtonHandler = (index, item) => {
    const checkBox = document.getElementById(item.idproduct);
    if (checkBox.checked) {
      setTotal((prev) => prev - myCart[index].price);
      dispatch(decreaseProductQuantity(index));
    } else {
      dispatch(decreaseProductQuantity(index));
    }
  };

  useEffect(() => {
    dispatch(setTotalPrice(total));
  }, [total]);

  return (
    <>
      {myCart.map((item, index) => {
        return (
          <div
            key={item.idproduct}
            className=" w-[90%] h-[200px] rounded-xl shadow-xl"
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
                  src={item.product_image}
                  className=" object-contain w-[200px] h-[200px] h-full"
                  alt="testing"
                />
              </div>
              <div className="flex sm:flex-row sm:gap-4 flex-col w-full mt-10 mb-3 justify-between">
                <div className="flex sm:flex-row flex-col justify-between gap-10 w-full ml-4">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-xs">1 Botol</p>
                  </div>
                  <p className="font-bold">{`Rp ${item.price},-`}</p>
                </div>
                <div className="flex flex-row gap-2 mx-4">
                  <button
                    onClick={() => addProductButtonHandler(index, item)}
                    className=" bg-blue-400 sm:absolute font-bold rounded-md w-[25px] h-[25px]  bottom-2 right-20 "
                  >
                    +
                  </button>
                  <span className="sm:absolute sm:bottom-2 sm:right-16">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => removeProductButtonHandler(index, item)}
                    className="bg-blue-400 sm:absolute rounded-md w-[25px] h-[25px]  bottom-2 right-10 "
                  >
                    -
                  </button>
                  <img
                    className="sm:absolute bottom-2 right-40"
                    src="../assets/trash.png"
                    alt="trashbin"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductCart;
