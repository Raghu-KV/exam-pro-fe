import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import ExamTypeForm from "../components/ExamTypeForm";
import { useGetExamTypeByIdQuery } from "../redux/requests/examTypeRequest";
import { useParams } from "react-router-dom";

function EditExamType() {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError } = useGetExamTypeByIdQuery(id);
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Exam Type"} />
      <ExamTypeForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditExamType;
