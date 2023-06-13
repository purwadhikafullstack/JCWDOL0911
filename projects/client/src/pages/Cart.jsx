import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//importing component for Cart page in here
import ProductCart from "../components/ProductCart";
import TotalPriceCart from "../components/TotalPriceCart";
import ProductCard from "../components/ProductCard";

import { fetchUser } from "../features/users/userSlice";

//import function from cartSlice
import { getRelatedProduct } from "../features/cart/cartSlice";

function Cart() {
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
      <div className="flex md:flex-row flex-col">
        <div className="flex flex-col md:w-[60%] justify-center mx-8 md:ml-8 gap-0 mt-5 shadow-xl rounded-xl">
          <ProductCart />
        </div>
        <div className="mt-5 md:pr-4 md:w-[40%] flex flex-col items-center">
          <TotalPriceCart />
        </div>
      </div>
      <hr className="mx-8 md:mt-20 mt-8 border-slate-400" />
      <div className="mt-10 ml-7 font-bold font-roboto leading-2 text-xl tracking-wide">
        Related Product
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:grid-cols-6 gap-4 mt-10 mx-6 justify-around">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <button onClick={() => console.log(myCart)}>press this</button>
      </div>
    </div>
  );
}

export default Cart;
