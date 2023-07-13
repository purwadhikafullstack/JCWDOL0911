import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { currency } from "../helpers/currency";
import Courier from "./transaction/Courier";
import { ORIGIN } from "../helpers/constant";
import { resetServices } from "../features/rajaongkir/rajaongkirSlice";
import { addUserOrder } from "../features/order/orderSlice";
import { getCost } from "../features/rajaongkir/rajaongkirSlice";
import Swal from "sweetalert2";

import { resetCart } from "../features/cart/cartSlice";
import { transactionDiscounts } from "../features/promo/promoSlice";

function OrderTotalPriceCart() {
  //generate freightPrice everytime userPick new services
  const [freightPrice, setFreightPrice] = useState(0);
  const [serviceData, setServiceData] = useState({});
  const [courierData, setCourierData] = useState("");
  const [discount, setDiscount] = useState(null);

  const cartProduct = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart);
  const bonustItems= useSelector((state)=>state.cart.bonusItem)
  const destinationAddress = useSelector(
    (state) => state.address.primaryAddress[0]
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const discounts = useSelector(state=>state.promo.discounts)

  const onClickCourierHandler = (event) => {
    setCourierData(event.target.value);
    dispatch(resetServices());
    resetFreightPrice();
    let destination = destinationAddress.idcity;
    let totalWeight = 0;
    let courier = event.target.value.toLowerCase();
    cartProduct.forEach((product) => (totalWeight += product.weight));
    if (event.target.value !== "" && totalWeight && destination) {
      dispatch(getCost(ORIGIN, destination, totalWeight, courier));
    } else {
      dispatch(resetServices());
      resetFreightPrice();
    }
  };

  //when user click submit order, dispatch data to backend
  const onSubmitOrderHandler = async () => {
    let orderData = {
      courierData: courierData,
      serviceData: serviceData,
      orderProduct: cartProduct,
      orderAddress: destinationAddress,
      orderPrice:discount? ((totalPrice.totalPrice + freightPrice) - (totalPrice.totalPrice * (discount.percentage / 100))):(totalPrice.totalPrice + freightPrice),
      idpromo: discount ? discount.id : null,
      bonusItems : bonustItems
    };
    const response = await dispatch(addUserOrder(orderData));
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: `${response.data.message}`,
        text: `Please proceed with the payment`,
      });
      dispatch(resetCart());
      navigate("/orderlist");
    }
  };

  //when address is change, reset freightPrice to 0
  const resetFreightPrice = () => {
    setFreightPrice(0);
  };

  //function to get freightPrice
  const onServicesClickHandler = (serviceData) => {
    if (serviceData !== "") {
      //below data is necessary for recording in database
      const { cost, description, service } = JSON.parse(serviceData);
      const freighCost = cost[0].value;
      setServiceData(JSON.parse(serviceData));
      setFreightPrice(freighCost);
    } else {
      resetFreightPrice();
    }
  };
 
  useEffect(() => {
    dispatch(transactionDiscounts())
  },[])
  

  return (
    <div className=" w-[90%] rounded-xl shadow-xl">
      <div className="text-xl ml-6 font-bold pt-6">Payment Summary</div>
      <div className="flex flex-col gap-4 justify-between mx-6 mt-4">
        <div className="flex flex-row justify-between ">
          <div>Total Price</div>
          <div>{currency(totalPrice.totalPrice)}</div>
        </div>
        <div className="flex flex-col gap-2 ">
        <div className="flex flex-row justify-between ">
            <div>Discount's</div>
            <div>{discount?.percentage }%</div>
            </div>
          <select
  name="courier"
  onChange={(e) => setDiscount(JSON.parse(e.target.value))}
  id="courier"
  className="border bg-white w-[50%] border-gray-500 text-sm rounded-lg p-2 focus:border-green-500"
>
  <option key={1} value="">
    Choose Discount
  </option>
  {discounts.map((discount) => {
    return (
      <option   value={JSON.stringify({ percentage: discount.discount, id: discount.idpromo })}
      key={discount.id} disabled={totalPrice.totalPrice >= discount.condition?false:true}>
        <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-bold text-lg">{discount.name}</p>
          <p>{discount.description}</p>
        </div>
      </option>
    );
  })}
</select>
        </div>
        <Courier
          onClickCourierHandler={onClickCourierHandler}
          onServicesClickHandler={onServicesClickHandler}
          resetFreightPrice={resetFreightPrice}
        />
        <div className="flex flex-row justify-between items-center">
          <div>
            Freight Cost{" "}
            <span
              hidden={freightPrice ? true : false}
              className="text-xs text-red-500"
            >
              (select courier service)
            </span>
          </div>
          <div>{currency(freightPrice)}</div>
        </div>
      </div>
      <hr className="border-[1px] border-gray-200 my-4" />
      <div className="flex flex-row justify-between mx-6">
        <div className="font-bold">Total Payment</div>
        <div className="font-bold text-green-500">
        {currency(discount ? (totalPrice.totalPrice + freightPrice) - (totalPrice.totalPrice * (discount.percentage / 100)) : (totalPrice.totalPrice + freightPrice))}
        </div>
      </div>

      <div className="w-full flex items-center my-10">
        {cartProduct.length ? (
          <button
            disabled={!freightPrice ? true : false}
            className=" disabled:bg-gray-300 disabled:hover:shadow-none hover:bg-green-500 hover:shadow-xl w-[80%] mx-auto rounded-md border-none text-white bg-green-700 h-[40px]"
            onClick={() => onSubmitOrderHandler()}
          >
            Submit Order
          </button>
        ) : (
          <button
            disabled
            className=" disabled:bg-gray-300 disabled:hover:shadow-none hover:bg-green-500 hover:shadow-xl w-[80%] mx-auto rounded-md border-none text-white bg-green-700 h-[40px]"
            onClick={() => navigate("/address")}
          >
            Pay
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderTotalPriceCart;
