import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import ExamTypeForm from "../components/ExamTypeForm";

function AddExamType() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Exam Type"} />
      <ExamTypeForm />
    </div>
  );
}

export default AddExamType;
