import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";

import { useTestApiQuery } from "../redux/requests/testRequest";

function Dashboard() {
  const { data, isLoading, isSuccess, isError, error } = useTestApiQuery();

  return (
    <div className="w-full">
      <PageHeaderComp heading={"Dashboard"} />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Dashboard;
