import React from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { currency } from "../helpers/currency";

function CardProduct({ product }) {
  const getName = (name) => {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };
  return (
    <div className="w-full max-w-xs h-1/3 border-2 flex flex-col items-center p-4 shadow-card-tagline rounded-md">
      <img
        src={
          product.product_image
            ? `${process.env.REACT_APP_API_BE}/${product.product_image}`
            : "./assets/icon-medicine.png"
        }
        alt=""
        width="72px"
      />
      <Tooltip label={product.name}>
        <p className="font-bold text-base mt-6 mb-2">{getName(product.name)}</p>
      </Tooltip>
      <div className="flex gap-1 items-center mb-6">
        <p className="text-sm text-slate-600">{currency(product.price)}</p>
      </div>
      <Button className="border-button">Add to Cart</Button>
    </div>
  );
}

export default CardProduct;
