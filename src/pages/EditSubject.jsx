import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import SubjectForm from "../components/SubjectForm";

function EditSubject() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Subjects"} />
      <SubjectForm />
    </div>
  );
}

export default EditSubject;
