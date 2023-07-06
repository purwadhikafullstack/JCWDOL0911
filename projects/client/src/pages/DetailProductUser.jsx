import React, { useEffect } from "react";
import { getProductById } from "../features/product/productSlice";
import { currency } from "../helpers/currency";
import { addProductToCart } from "../features/cart/cartSlice";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function DetailProductUser() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.product);

  console.log("product", product);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, []);

  return (
    <div>
      <div className="w-full justify-center gap-11 my-11 flex flex-wrap lg:flex-nowrap ">
        <div className="">
          <img
            className="w-52 lg:w-72"
            src={
              product.product_image
                ? `${process.env.REACT_APP_API_BE}/uploads/${product.product_image}`
                : "./assets/icon-medicine.png"
            }
            alt="image not found"
          />
        </div>

        <div className="mt-7 shadow-card-tagline border-y-2 w-full max-w-xs flex flex-col p-2 mx-11 lg:mx-0">
          <div className="p-4">
            <div className="text-xl font-extrabold">{product.name}</div>
            <div className="mt-4 text-sm font-medium">
              {product.description}
            </div>
            <div className="mt-2 text-sm font-medium">
              Stock : {product.stock}
            </div>
            <div className="mt-2 text-sm font-medium">
              Category : {product.category?.name || "-"}
            </div>
            <div className="mt-2 text-sm font-medium">
              {currency(product.price)}
            </div>
          </div>
          <Button
            className="button-primary mt-14 mb-1"
            variant={"solid"}
            size={"sm"}
            onClick={() =>
              navigate("/cart", dispatch(addProductToCart(product)))
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailProductUser;
