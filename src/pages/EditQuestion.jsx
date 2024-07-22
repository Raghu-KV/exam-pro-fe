import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import QuestionForm from "../components/QuestionForm";
import { useParams } from "react-router-dom";
import { useGetSingleQuestionQuery } from "../redux/requests/question.request";

function EditQuestion() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } =
    useGetSingleQuestionQuery(id);
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Question"} />
      <QuestionForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditQuestion;
