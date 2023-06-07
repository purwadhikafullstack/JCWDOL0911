import React from "react";
import { Button, Tooltip } from "@chakra-ui/react";

function CardProduct() {
  const getName = (name) => {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };
  return (
    <div className="w-full max-w-xs h-1/3 border-2 flex flex-col items-center p-4 shadow-card-tagline rounded-md">
      <img src="./assets/icon-medicine.png" alt="" width="72px" />
      <Tooltip label={"Panadol Merah 10 tablet"}>
        <p className="font-bold text-base mt-6 mb-4">
          {getName("Panadol Merah 10 tablet")}
        </p>
      </Tooltip>
      <div className="flex gap-1 items-center mb-6">
        <p className="font-bold text-base">Rp. 20000</p>
        <p>/ pack</p>
      </div>
      <Button className="border-button">Add to Cart</Button>
    </div>
  );
}

export default CardProduct;
