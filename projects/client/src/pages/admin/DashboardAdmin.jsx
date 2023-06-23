import React from "react";
import Sidebar from "../../components/admin/Sidebar";

function DashboardAdmin() {
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
          <p>background: #3e8d9e </p>
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
