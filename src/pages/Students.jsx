import React from "react";
import PageHeader from "../components/PageHeader";

function Students() {
  return (
    <div className="w-full">
      <PageHeader
        heading={"Students"}
        buttonContent={"Add student"}
        route={"/auth/student/add-student"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Students;
