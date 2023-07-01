import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import OrderListCard from "../../components/orderlist/OrderListCard";

function Transaction() {
  return (
    <>
      <div className="w-screen h-full flex justify-between bg-slate-50">
        <div className="w-80">
          <Sidebar />
        </div>
        <div
          className="h-screen bg-dashboard-admin"
          style={{ width: "calc(100vw - 320px)" }}
        >
          <div className="mx-auto">
            <OrderListCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
