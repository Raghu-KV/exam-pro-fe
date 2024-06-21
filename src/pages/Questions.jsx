import React from "react";
import PageHeader from "../components/PageHeader";

function Questions() {
  return (
    <div className="w-full">
      <PageHeader
        heading={"Questions"}
        buttonContent={"Add question"}
        route={"/auth/questions/add-question"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Questions;
