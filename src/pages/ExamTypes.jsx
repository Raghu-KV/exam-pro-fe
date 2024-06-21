import React from "react";
import PageHeader from "../components/PageHeader";

function ExamTypes() {
  return (
    <div className="w-full">
      <PageHeader
        heading={"Exam Types"}
        buttonContent={"Add exam type"}
        route={"/auth/exam-types/add-exam-type"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default ExamTypes;
