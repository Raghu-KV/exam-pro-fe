import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import SubjectForm from "../components/SubjectForm";

function AddSubject() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Subjects"} />
      <SubjectForm />
    </div>
  );
}

export default AddSubject;
