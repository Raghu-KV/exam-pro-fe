import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";

function Students() {
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Students"}
        buttonContent={"Add student"}
        route={"/auth/student/add-student"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Students;
