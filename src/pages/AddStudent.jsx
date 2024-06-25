import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import StudentForm from "../components/StudentForm";

function AddStudent() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Student"} />
      <StudentForm />
    </div>
  );
}

export default AddStudent;
