import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import StudentForm from "../components/StudentForm";
import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../redux/requests/studentRequest";

function EditStudent() {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError } = useGetStudentByIdQuery(id);

  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Student"} />
      <StudentForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditStudent;
