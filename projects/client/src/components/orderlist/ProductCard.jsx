import React, { useEffect, useState } from "react";
import trash from "../../assets/trash.png";
import { currency } from "../../helpers/currency";

function ProductCard({ product }) {
  return (
    <div className="md:flex-row flex flex-col sm:gap-6 gap-10 mt-4">
      <img
        className="lg:w-[15%] md:w-[30%] w-[50%] mx-auto object-contain"
        src={trash}
        alt="gambar"
      />
      <div className="flex flex-col justify-between md:w-[70%] lg:[85%]">
        <div className="flex md:flex-row flex-col justify-between">
          <div className="flex flex-col justify-between">
            <div>{product.name}</div>
            <div>1 {product.unit}</div>
          </div>
          <div className="font-bold">
            {currency(product.price * product.quantity)}
          </div>
        </div>
        <div className="mt-4 text-green-600">Show Detail</div>
      </div>
    </div>
  );
}

export default ProductCard;
