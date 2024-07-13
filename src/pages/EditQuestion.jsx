import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import QuestionForm from "../components/QuestionForm";

function EditQuestion() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Question"} />
      <QuestionForm />
    </div>
  );
}

export default EditQuestion;
