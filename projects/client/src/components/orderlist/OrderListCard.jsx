import React, { useState, useEffect } from "react";
import WaitingOrderCard from "./WaitingOrderCard";
import PrescriptionOrderCard from "./PrescriptionOrderCard";
import SendOrderCard from "./SendOrderCard";
import OnProcessOrderCard from "./OnProcessOrderCard";
import FinishedOrderCard from "./FinishedOrderCard";
import ReviewOrderCard from "./ReviewOrderCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminFinishedTransaction,
  fetchAdminOnProcessTransaction,
  fetchAdminPrescriptionTransaction,
  fetchAdminReviewTransaction,
  fetchAdminSendTransaction,
  fetchFinishedTransaction,
  fetchOnProcessTransaction,
  fetchPrescriptionTransaction,
  fetchReviewTransaction,
  fetchSendTransaction,
  fetchWaitingTransaction,
  resetPrescription,
  resetTransaction,
} from "../../features/order/orderSlice";
import { fetchAdminWaitingTransaction } from "../../features/order/orderSlice";
import ReactPaginate from "react-paginate";

function OrderListCard() {
  //pagination state
  const [order, setOrder] = useState("desc");
  const [orderState, setOrderState] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    paginateFunctionHandler();
  }, [page, keyword, orderState]);

  const pageChange = ({ selected }) => {
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
        dispatch(resetPrescription());
        const waitingPageInfo = await dispatch(
          fetchWaitingTransaction(keyword, page, limit, order)
        );
        setRows(waitingPageInfo.totalOfRows);
        setPages(waitingPageInfo.totalPages);
      } else if (orderState === "review") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const reviewPageInfo = await dispatch(
          fetchReviewTransaction(keyword, page, limit)
        );
        setRows(reviewPageInfo.totalOfRows);
        setPages(reviewPageInfo.totalPages);
      } else if (orderState === "prescription") {
        dispatch(resetTransaction());
        const prescriptionPageInfo = await dispatch(
          fetchPrescriptionTransaction(keyword, page, limit)
        );
        setRows(prescriptionPageInfo.totalOfRows);
        setPages(prescriptionPageInfo.totalPages);
      } else if (orderState === "onprocess") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const onProcessPageInfo = await dispatch(
          fetchOnProcessTransaction(keyword, page, limit)
        );
        setRows(onProcessPageInfo.totalOfRows);
        setPages(onProcessPageInfo.totalPages);
      } else if (orderState === "send") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const sendPageInfo = await dispatch(
          fetchSendTransaction(keyword, page, limit, order)
        );
        setRows(sendPageInfo.totalOfRows);
        setPages(sendPageInfo.totalPages);
      } else if (orderState === "finished") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const finishedPageInfo = await dispatch(
          fetchFinishedTransaction(keyword, page, limit, order)
        );
        setRows(finishedPageInfo.totalOfRows);
        setPages(finishedPageInfo.totalPages);
      }
    } else if (localStorage.getItem("admin")) {
      if (orderState === "waiting") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const waitingPageInfo = await dispatch(
          fetchAdminWaitingTransaction(keyword, page, limit, order)
        );
        setRows(waitingPageInfo.totalOfRows);
        setPages(waitingPageInfo.totalPages);
      } else if (orderState === "prescription") {
        dispatch(resetPrescription());
        dispatch(resetTransaction());
        const prescriptionPageInfo = await dispatch(
          fetchAdminPrescriptionTransaction(keyword, page, limit)
        );
        setRows(prescriptionPageInfo.totalOfRows);
        setPages(prescriptionPageInfo.totalPages);
      } else if (orderState === "review") {
        dispatch(resetPrescription());
        dispatch(resetTransaction());
        const reviewPageInfo = await dispatch(
          fetchAdminReviewTransaction(keyword, page, limit)
        );
        setRows(reviewPageInfo.totalOfRows);
        setPages(reviewPageInfo.totalPages);
      } else if (orderState === "onprocess") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const onProcessPageInfo = await dispatch(
          fetchAdminOnProcessTransaction(keyword, page, limit)
        );
        setRows(onProcessPageInfo.totalOfRows);
        setPages(onProcessPageInfo.totalPages);
      } else if (orderState === "send") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const sendPageInfo = await dispatch(
          fetchAdminSendTransaction(keyword, page, limit, order)
        );
        setRows(sendPageInfo.totalOfRows);
        setPages(sendPageInfo.totalPages);
      } else if (orderState === "finished") {
        dispatch(resetTransaction());
        dispatch(resetPrescription());
        const sendPageInfo = await dispatch(
          fetchAdminFinishedTransaction(keyword, page, limit, order)
        );
        setRows(sendPageInfo.totalOfRows);
        setPages(sendPageInfo.totalPages);
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
  const onClickPrescriptionHandler = (e) => {
    setPage(0);
    setOrderState(e.target.id);
    setIsPrescriptionOpen(true);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
    setIsSendOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  // when waiting is clicked by user, turn the other component off
  const onClickWaitingHandler = (e) => {
    setPage(0);
    setOrderState(e.target.id);
    setIsWaitingOpen(true);
    setIsPrescriptionOpen(false);
    setIsOnProcessOpen(false);
    setIsSendOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  // when waiting is clicked by user, turn the other component off
  const onClickOnProcessHandler = (e) => {
    setPage(0);
    setOrderState(e.target.id);
    setIsOnProcessOpen(true);
    setIsWaitingOpen(false);
    setIsPrescriptionOpen(false);
    setIsSendOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  // when send is clicked by user, turn the other component off
  const onClickSendHandler = (e) => {
    setPage(0);
    setOrderState(e.target.id);
    setIsSendOpen(true);
    setIsPrescriptionOpen(false);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
    setIsFinishedOpen(false);
    setIsReviewOpen(false);
  };

  const onClickFinishedHandler = (e) => {
    setPage(0);
    setOrderState(e.target.id);
    setIsFinishedOpen(true);
    setIsSendOpen(false);
    setIsPrescriptionOpen(false);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
    setIsReviewOpen(false);
  };

  const onClickReviewHandler = (e) => {
    setPage(0);
    setOrderState(e.target.id);
    setIsReviewOpen(true);
    setIsFinishedOpen(false);
    setIsSendOpen(false);
    setIsPrescriptionOpen(false);
    setIsWaitingOpen(false);
    setIsOnProcessOpen(false);
  };

  useEffect(() => {
    setPage(0);
    setOrderState("prescription");
    setIsPrescriptionOpen(true);
  }, []);

  console.log({ isPrescriptionOpen });

  return (
    <div className="">
      <div className="flex sm:flex-row flex-col justify-between py-5 items-center">
        <div
          id="prescription"
          onClick={onClickPrescriptionHandler}
          className={`hover:cursor-pointer transition duration-300 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full ${
            isPrescriptionOpen &&
            "border-b-4 border-b-green-600 font-bold bg-green-50 sm:bg-transparent rounded-t-md"
          }`}
        >
          Prescription
        </div>
        <div
          id="waiting"
          onClick={onClickWaitingHandler}
          className={`hover:cursor-pointer transition duration-300 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full ${
            isWaitingOpen &&
            "border-b-4 border-b-green-600 font-bold bg-green-50 sm:bg-transparent rounded-t-md"
          }`}
        >
          Waiting
        </div>
        <div
          id="review"
          onClick={onClickReviewHandler}
          className={`hover:cursor-pointer transition duration-300 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full ${
            isReviewOpen &&
            "border-b-4 border-b-green-600 font-bold bg-green-50 sm:bg-transparent rounded-t-md"
          }`}
        >
          Review
        </div>
        <div
          id="onprocess"
          onClick={onClickOnProcessHandler}
          className={`hover:cursor-pointer transition duration-300 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full ${
            isOnProcessOpen &&
            "border-b-4 border-b-green-600 font-bold bg-green-50 sm:bg-transparent rounded-t-md"
          }`}
        >
          On Process
        </div>
        <div
          id="send"
          onClick={onClickSendHandler}
          className={`hover:cursor-pointer transition duration-300 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full ${
            isSendOpen &&
            "border-b-4 border-b-green-600 font-bold bg-green-50 sm:bg-transparent rounded-t-md"
          }`}
        >
          Send
        </div>
        <div
          id="finished"
          onClick={onClickFinishedHandler}
          className={`hover:cursor-pointer transition duration-300 ease-out hover:ease-in hover:border-b-4 h-[50px] hover:border-b-green-600 pb-4 text-center w-full ${
            isFinishedOpen &&
            "border-b-4 border-b-green-600 font-bold bg-green-50 sm:bg-transparent rounded-t-md"
          }`}
        >
          Finished
        </div>
      </div>
      <div className="w-full flex flex-wrap lg:flex-nowrap justify-between px-3 mb-4 gap-4">
        <div className="flex flex-wrap w-full sm:flex-nowrap sm:w-3/5 sm:gap-4">
          <label className="flex-1" htmlFor="filter">
            Search
          </label>
          <input
            id="filter"
            type="text"
            className="border-2 border-gray-400 rounded-md w-full"
          />
        </div>
        <div className="">
          <select value="">
            <option name="order" value="asc">
              Ascending
            </option>
            <option name="order" value="desc">
              Descending
            </option>
          </select>
        </div>
      </div>
      {isWaitingOpen ? (
        <WaitingOrderCard changePageInfo={changePageInfo} />
      ) : null}
      {isPrescriptionOpen ? <PrescriptionOrderCard /> : null}
      {isSendOpen ? <SendOrderCard changePageInfo={changePageInfo} /> : null}
      {isOnProcessOpen ? (
        <OnProcessOrderCard changePageInfo={changePageInfo} />
      ) : null}
      {isFinishedOpen ? <FinishedOrderCard /> : null}
      {isReviewOpen ? (
        <ReviewOrderCard changePageInfo={changePageInfo} />
      ) : null}
      <div>
        Total Transactions: {rows}, Page: {rows ? page + 1 : 0} of {pages}
      </div>
      <nav className="mt-4" key={rows} role="navigation">
        <ReactPaginate
          breakLabel="..."
          previousLabel={"<< Prev"}
          nextLabel={"Next >>"}
          pageCount={pages}
          onPageChange={pageChange}
          containerClassName="flex items-center flex-row justify-center gap-2 text-xs sm:text-base"
          pageClassName="sm:p-1 sm:w-[5%] w-[10%] items-center hover:bg-blue-600 hover:text-white bg-blue-200 rounded text-center rounded"
          activeLinkClassName="font-bold"
          previousLinkClassName="w-[10%] bg-blue-200 rounded sm:p-1 hover:bg-blue-600 hover:text-white"
          nextLinkClassName="w-[10%] bg-blue-200 rounded sm:p-1 hover:bg-blue-600 hover:text-white"
        />
      </nav>
    </div>
  );
}

export default OrderListCard;
