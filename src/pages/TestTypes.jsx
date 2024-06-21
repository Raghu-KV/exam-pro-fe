import React from "react";
import PageHeader from "../components/PageHeader";

function TestTypes() {
  return (
    <div className="w-full">
      <PageHeader
        heading={"Test Types"}
        buttonContent={"Add test type"}
        route={"/auth/test-types/add-test-type"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default TestTypes;
