import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import QuestionForm from "../components/QuestionForm";
import AddTestForm from "../components/AddTestForm";
import { useParams } from "react-router-dom";
import { useGetTestPrefillQuery } from "../redux/requests/testTypesRequest";

function EditTest() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useGetTestPrefillQuery(id);

  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Test"} />
      <AddTestForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditTest;
