import React from "react";
import TransactionCard from "./TransactionCard";

function WaitingOrderCard({ changePageInfo }) {
  return (
    <>
      <TransactionCard changePageInfo={changePageInfo} />
    </>
  );
}

export default WaitingOrderCard;
