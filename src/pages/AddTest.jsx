import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import QuestionForm from "../components/QuestionForm";
import AddTestForm from "../components/AddTestForm";

function AddTest() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Test"} />
      <AddTestForm />
    </div>
  );
}

export default AddTest;
