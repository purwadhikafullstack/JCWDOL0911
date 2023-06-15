import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//importing component for Cart page in here
import OrderProductCart from "../components/OrderProductCart";
import OrderTotalPriceCart from "../components/OrderTotalPriceCart";

import { fetchUser } from "../features/users/userSlice";

//import function from cartSlice
import { getRelatedProduct } from "../features/cart/cartSlice";

function Order() {
  const myCart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(myCart);
  }, [myCart.length]);

  useEffect(() => {
    dispatch(fetchUser());
  });

  return (
    <div>
      <div className="mt-10 ml-7 font-bold font-roboto leading-2 text-xl tracking-wide">
        My Cart
      </div>
      <div className="flex md:flex-row flex-col mb-20">
        <div className="flex flex-col md:w-[60%] justify-center mx-8 md:ml-8 gap-0 mt-5 rounded-xl">
          <OrderProductCart />
        </div>
        <div className="mt-5 md:pr-4 md:w-[40%] flex flex-col items-center">
          <OrderTotalPriceCart />
        </div>
      </div>
    </div>
  );
}

export default Order;
