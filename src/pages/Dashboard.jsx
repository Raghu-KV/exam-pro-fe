import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";

function Dashboard() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Dashboard"} />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Dashboard;
