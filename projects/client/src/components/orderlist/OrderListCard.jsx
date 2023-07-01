import React, { useState, useEffect } from "react";
import WaitingOrderCard from "./WaitingOrderCard";
import PrescriptionOrderCard from "./PrescriptionOrderCard";
import SendOrderCard from "./SendOrderCard";
import OnProcessOrderCard from "./OnProcessOrderCard";
import FinishedOrderCard from "./FinishedOrderCard";
import ReviewOrderCard from "./ReviewOrderCard";
import { useDispatch } from "react-redux";
import {
  fetchReviewTransaction,
  fetchWaitingTransaction,
  resetTransaction,
} from "../../features/order/orderSlice";
import Swal from "sweetalert2";
import { fetchAdminWaitingTransaction } from "../../features/order/orderSlice";
import ReactPaginate from "react-paginate";

function OrderListCard() {
  //pagination state
  const [orderState, setOrderState] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    paginateFunctionHandler();
  }, [page, keyword, orderState]);

  const pageChange = ({ selected }) => {
    console.log(selected);
    setPage(selected);
  };

  //function to set page, totalpage, and totalRows once upload payment image
  const changePageInfo = ({ page, totalPages, totalOfRows }) => {
    setPages(totalPages);
    setRows(totalOfRows);
  };

  const paginateFunctionHandler = async () => {
    if (localStorage.getItem("user")) {
      if (orderState === "waiting") {
        dispatch(resetTransaction());
        setPage(0);
        const waitingPageInfo = await dispatch(
          fetchWaitingTransaction(keyword, page, limit)
        );
        setRows(waitingPageInfo.totalOfRows);
        setPages(waitingPageInfo.totalPages);
      } else if (orderState === "review") {
        dispatch(resetTransaction());
        const reviewPageInfo = await dispatch(
          fetchReviewTransaction(keyword, page, limit)
        );
        setRows(reviewPageInfo.totalOfRows);
        setPages(reviewPageInfo.totalPages);
      }
    } else if (localStorage.getItem("admin")) {
      if (orderState === "waiting") {
        const waitingPageInfo = await dispatch(
          fetchAdminWaitingTransaction(keyword, page, limit)
        );
        setRows(waitingPageInfo.totalOfRows);
        setPages(waitingPageInfo.totalPages);
      }
    }
  };

  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isWaitingOpen, setIsWaitingOpen] = useState(false);
  const [isOnProcessOpen, setIsOnProcessOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isFinishedOpen, setIsFinishedOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const dispatch = useDispatch();

  //when prescription is clicked by user, turn the other component off
  const onClickPrescriptionHandler = () => {
    setIsPrescriptionOpen(true);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
    setIsSendOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  // when waiting is clicked by user, turn the other component off
  const onClickWaitingHandler = (e) => {
    setOrderState(e.target.id);
    setIsWaitingOpen(true);
    setIsPrescriptionOpen(false);
    setIsOnProcessOpen(false);
    setIsSendOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  // when waiting is clicked by user, turn the other component off
  const onClickOnProcessHandler = () => {
    setIsOnProcessOpen(true);
    setIsWaitingOpen(false);
    setIsPrescriptionOpen(false);
    setIsSendOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  // when send is clicked by user, turn the other component off
  const onClickSendHandler = () => {
    setIsSendOpen(true);
    setIsPrescriptionOpen(false);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  const onClickFinishedHandler = () => {
    setIsFinishedOpen(true);
    setIsSendOpen(false);
    setIsPrescriptionOpen(false);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
    setIsReviewOpen(false);
  };

  const onClickReviewHandler = (e) => {
    setOrderState(e.target.id);
    setIsReviewOpen(true);
    setIsFinishedOpen(false);
    setIsSendOpen(false);
    setIsPrescriptionOpen(false);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
  };

  useEffect(() => {
    setIsPrescriptionOpen(true);
  }, []);

  return (
    <div className="w-full rounded shadow-xl md:px-10 px-5 py-10">
      <div className="text-2xl md:text-start text-center font-bold">
        Order List
      </div>
      <hr className="my-4" />
      <div className="flex sm:flex-row flex-col justify-between py-5 items-center">
        <div
          id="prescription"
          onClick={onClickPrescriptionHandler}
          className="hover:cursor-pointer transition duration-300 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full"
        >
          Prescription
        </div>
        <div
          id="waiting"
          onClick={onClickWaitingHandler}
          className="hover:cursor-pointer transition duration-200 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full"
        >
          Waiting
        </div>
        <div
          id="review"
          onClick={onClickReviewHandler}
          className="hover:cursor-pointer transition duration-200 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full"
        >
          Review
        </div>
        <div
          id="onprocess"
          onClick={onClickOnProcessHandler}
          className="hover:cursor-pointer transition duration-200 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full"
        >
          On Process
        </div>
        <div
          id="send"
          onClick={onClickSendHandler}
          className="hover:cursor-pointer transition duration-200 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full"
        >
          Send
        </div>
        <div
          id="finished"
          onClick={onClickFinishedHandler}
          className="hover:cursor-pointer transition duration-200 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full"
        >
          Finished
        </div>
      </div>
      {isWaitingOpen ? (
        <WaitingOrderCard changePageInfo={changePageInfo} />
      ) : null}
      {isPrescriptionOpen ? <PrescriptionOrderCard /> : null}
      {isSendOpen ? <SendOrderCard /> : null}
      {isOnProcessOpen ? <OnProcessOrderCard /> : null}
      {isFinishedOpen ? <FinishedOrderCard /> : null}
      {isReviewOpen ? <ReviewOrderCard /> : null}
      <div>
        Total Transactions: {rows}, Page: {rows ? page + 1 : 0} of {pages}
      </div>
      <nav className="mt-4" role="navigation">
        <ReactPaginate
          breakLabel="..."
          previousLabel={"<< Prev"}
          nextLabel={"Next >>"}
          pageCount={pages}
          onPageChange={pageChange}
          containerClassName="flex items-center flex-row justify-center gap-2"
          pageClassName="p-2 sm:w-[5%] w-[10%] items-center hover:bg-blue-600 hover:text-white bg-blue-200 rounded text-center rounded"
          activeLinkClassName="font-bold"
          previousLinkClassName="w-[10%] bg-blue-200 rounded p-2 hover:bg-blue-600 hover:text-white"
          nextLinkClassName="w-[10%] bg-blue-200 rounded p-2 hover:bg-blue-600 hover:text-white"
        />
      </nav>
    </div>
  );
}

export default OrderListCard;