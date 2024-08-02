import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const token = localStorage.getItem("auth-token");
  const decoded = jwtDecode(token);

  console.log(decoded, "infoo");

  return (
    <div className="w-full">
      <PageHeaderComp heading={"Dashboard"} />
      <div className="pt-4 px-4">
        <h1 className="font-bold text-2xl">
          <span className="text-appGray text-lg mr-2">Welcome</span>
          {decoded.userInfo.userName}
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;
