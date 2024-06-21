import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";

function Questions() {
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Questions"}
        buttonContent={"Add question"}
        route={"/auth/questions/add-question"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Questions;
