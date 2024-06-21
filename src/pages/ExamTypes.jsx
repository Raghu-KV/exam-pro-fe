import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";

function ExamTypes() {
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Exam Types"}
        buttonContent={"Add exam type"}
        route={"/auth/exam-types/add-exam-type"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default ExamTypes;
