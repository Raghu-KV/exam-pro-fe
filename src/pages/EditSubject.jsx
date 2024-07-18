import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import SubjectForm from "../components/SubjectForm";
import { useParams } from "react-router-dom";
import { useGetSingleSubjectQuery } from "../redux/requests/subjectsRequest";

function EditSubject() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useGetSingleSubjectQuery(id);
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Subjects"} />
      <SubjectForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditSubject;
