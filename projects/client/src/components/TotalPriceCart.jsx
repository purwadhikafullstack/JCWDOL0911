import React from "react";

import { useSelector } from "react-redux";

function TotalPriceCart() {
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <div className=" w-[90%] rounded-xl shadow-xl">
      <div className="ml-6">Total Price</div>
      <div className="flex flex-row justify-between mx-6">
        <div>Sub Total</div>
        <div>Rp 13.000,-</div>
      </div>
      <hr />
      <div className="flex flex-row justify-between mx-6">
        <div>Total</div>
        <div>{`Rp ${totalPrice},-`}</div>
      </div>

      <div className="w-full flex items-center my-10">
        <button className=" hover:bg-green-500 hover:shadow-xl w-[80%] mx-auto rounded-md border-none text-white bg-green-700 h-[40px]">
          Pay
        </button>
      </div>
    </div>
  );
}

export default TotalPriceCart;
