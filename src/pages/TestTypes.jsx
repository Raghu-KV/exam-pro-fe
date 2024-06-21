import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";

function TestTypes() {
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Test Types"}
        buttonContent={"Add test type"}
        route={"/auth/test-types/add-test-type"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default TestTypes;
