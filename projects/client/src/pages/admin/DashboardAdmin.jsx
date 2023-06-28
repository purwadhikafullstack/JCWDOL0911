import React from "react";
import Sidebar from "../../components/admin/Sidebar";

function DashboardAdmin() {
  return (
    <>
      <div className="w-screen h-full flex justify-between bg-slate-50">
        <div className="sidebar-width">
          <Sidebar />
        </div>
        <div className="min-h-screen h-full bg-dashboard-admin p-8 lg:p-28 flex flex-col gap-11 content-width">
          <p>background: #3e8d9e </p>
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
