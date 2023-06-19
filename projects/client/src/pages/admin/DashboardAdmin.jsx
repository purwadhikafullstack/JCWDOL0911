import React from "react";
import Sidebar from "../../components/admin/Sidebar";

function DashboardAdmin() {
  return (
    <>
      <div className="w-screen h-full flex justify-between bg-slate-50">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-full h-screen bg-dashboard-admin">
          <p>background: #3e8d9e </p>
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
