import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import StudentForm from "../components/StudentForm";
import { useParams } from "react-router-dom";

function EditStudent() {
  const params = useParams();

  console.log(params);
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Student"} />
      <StudentForm />
    </div>
  );
}

export default EditStudent;
