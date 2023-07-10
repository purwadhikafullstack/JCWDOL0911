import React from "react";
import {
  Button,
  Tooltip,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
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
    if (name.length > 15) {
      return name.slice(0, 15) + "...";
    }
    return name;
  };
  return (
    <div className="max-w-xs flex flex-col items-center p-2 shadow-card-tagline border-y-2 rounded-md">
      <Card maxW="xs">
        <CardBody>
          <div className="w">
            <Image
              src={
                product.product_image
                  ? `${process.env.REACT_APP_API_BE}/uploads/${product.product_image}`
                  : "./assets/icon-medicine.png"
              }
              alt="medicine"
              className="w-20 h-20 mx-auto"
            />
          </div>
          <Stack mt="6" spacing="4">
            <Tooltip label={product.name}>
              {/* <Heading size="md">{product.name}</Heading> */}
              <Heading size="md">{getName(product.name)}</Heading>
            </Tooltip>
            <Text color="black" className="text-sm font-medium">
              {currency(product.price)}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              size={"sm"}
              className="border-button"
              onClick={() => dispatch(addProductToCart(product))}
            >
              Add to Cart
            </Button>
            <Button
              className="button-primary"
              variant={"ghost"}
              size={"sm"}
              onClick={() => navigate("/detail/" + product.idproduct)}
            >
              Detail
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CardProduct;
