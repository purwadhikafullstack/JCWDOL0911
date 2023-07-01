import React, { useEffect, useState } from "react";
import { currency } from "../../helpers/currency";
import { parse, format } from "date-fns";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import dots_comment from "../../assets/dots_comment.png";
import PaymentModal from "../payment/PaymentModal";
import { setSelectedTransaction } from "../../features/order/orderSlice";
import { useDispatch } from "react-redux";

function ReviewOrderCard() {
  const dispatch = useDispatch();
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const transactions = useSelector((state) => state.order.transaction);

  const onClickPayNowHandler = (transaction) => {
    dispatch(setSelectedTransaction(transaction));
    setIsPaymentModal((prev) => !prev);
  };

  const onClickClosePaymentHandler = () => {
    setIsPaymentModal((prev) => !prev);
  };

  useEffect(() => {
    console.log(localStorage.getItem("admin") ? true : false);
  }, []);

  return (
    <>
      {transactions.map((transaction, transactionIndex) => {
        return (
          <div className="w-full rounded even:bg-green-50 odd:bg-gray-50 shadow-xl px-6 pb-4 pt-1 mb-10">
            <div className="font-bold mt-4 md:text-left text-center text-green-700">
              Transaction ID : {transaction.idtransaction}
            </div>
            <div className="flex md:flex-col flex-col-reverse">
              <div className="flex items-center sm:flex-row sm:gap-0 gap-4 flex-col justify-between mb-4">
                <div>
                  {format(
                    Date.parse(transaction.waiting_date),
                    "EEEE, dd-MMMM-yyyy, HH:mm:ss"
                  )}
                </div>
                <div className="rounded bg-yellow-400 border-2 font-bold text-yellow-900 border-yellow-700 p-2">
                  {transaction.status}
                </div>
              </div>
              <hr className="my-2" />
              {transactions[transactionIndex].orderProduct.map((product) => {
                return <ProductCard product={product} />;
              })}
              <hr className="mt-4" />
            </div>
            <hr />
            <div className="flex flex-row w-[100%] sm:justify-end justify-between sm:gap-20 mt-2">
              <div className="font-bold text-green-700">Sub Total</div>
              <div className="font-bold text-green-700">
                {currency(transaction.total)}
              </div>
            </div>
            <div className="flex sm:flex-row-reverse flex-col mt-4 justify-between items-center">
              <div className="flex sm:w-[50%] w-full flex-row gap-4">
                <button
                  hidden={localStorage.getItem("user") ? true : false}
                  className=" w-full p-2 font-bold mx-auto rounded hover:bg-red-800 text-white bg-red-600"
                >
                  Reject
                </button>
                <button
                  hidden={localStorage.getItem("user") ? true : false}
                  onClick={() => onClickPayNowHandler(transaction)}
                  className=" w-full  p-2 font-bold mx-auto rounded hover:bg-green-800 text-white bg-green-600"
                >
                  Accept
                </button>
              </div>
              <div className="flex flex-row mt-4 items-center hover:cursor-pointer gap-5 md:justify-start">
                <img className="w-[30px]" src={dots_comment} alt="dots" />
                <div className="font-bold text-green-600">
                  Are you confused?
                </div>
              </div>
            </div>
            {isPaymentModal ? (
              <PaymentModal modalHandler={onClickClosePaymentHandler} />
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export default ReviewOrderCard;
