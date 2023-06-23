import React from "react";
import {
  Button, Tooltip, Card, CardBody, CardFooter, Image, Stack, Heading
  , Text, Divider, ButtonGroup
} from "@chakra-ui/react";
import { currency } from "../helpers/currency";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//importing cartSlice function here
import { addProductToCart } from "../features/cart/cartSlice";

function CardProduct({ product }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = (name) => {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };
  return (
    <div className="w-full max-w-xs flex flex-col items-center p-2 shadow-card-tagline border-y-2 rounded-md">
      {/* shadow-card-tagline h-1/3 border-2*/}
      <Card maxW='xs'>
        <CardBody>
          <Image
            src={`${process.env.REACT_APP_API_BE}/uploads/${product.product_image}`}
            alt='medicine'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{getName(product.name)}</Heading>
            <Text color='black' className="text-sm font-medium">
              {currency(product.price)}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button
              size={"sm"}
              className="border-button"
              onClick={() => dispatch(addProductToCart(product))}
            >
              Add to Cart
            </Button>
            <Button
              className='button-primary'
              variant={"ghost"}
              size={"sm"}
              onClick={() => navigate("/detail/" + product.idproduct)}>
              Detail
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      {/* <img
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
      <Button
        className="border-button"
        onClick={() => {
          dispatch(addProductToCart(product));
        }}
      >
        Add to Cart
      </Button>
      <Button
        size={"sm"}
        onClick={() => navigate("/detail/" + product.idproduct)}>
        Detail
      </Button> */}

    </div>
  );
}

export default CardProduct;
