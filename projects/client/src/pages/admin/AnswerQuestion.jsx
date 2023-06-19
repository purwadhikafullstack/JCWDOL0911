import React from "react";
import Sidebar from "../../components/admin/Sidebar";

function AnswerQuestion() {
  return (
    <>
      <div className="w-screen h-full flex justify-between bg-slate-50">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-full h-screen bg-dashboard-admin">
          <p>answer question </p>
        </div>
      </div>
    </>
  );
}

export default AnswerQuestion;
