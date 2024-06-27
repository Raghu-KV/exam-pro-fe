import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import QuestionForm from "../components/QuestionForm";

function AddQuestion() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Question"} />
      <QuestionForm />
    </div>
  );
}

export default AddQuestion;
