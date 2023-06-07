import React from "react";

import { useSelector } from "react-redux";

function TotalPriceCart() {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartProduct = useSelector((state) => state.cart.cart);

  return (
    <div className=" w-[90%] rounded-xl shadow-xl">
      <div className="ml-6 font-bold pt-6">Summary</div>
      <div className="flex flex-col justify-between mx-6 mt-4">
        {cartProduct.map((val) => {
          if (val.summary) {
            // if (checkBox.checked) {
            return (
              <div
                key={val.idproduct}
                className="flex flex-row justify-between "
              >
                <div className="col-span-2">{val.name}</div>

                <div className="text-end whitespace-nowrap">
                  Rp. {val.price * val.quantity},-
                </div>
              </div>
            );
            // }
          }
        })}
      </div>
      <hr className="border-gray-300 my-4" />
      <div className="flex flex-row justify-between mx-6">
        <div>Total Price</div>
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
