import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import ChapterForm from "../components/ChapterForm";
import { useParams } from "react-router-dom";
import { useGetChapterByIdQuery } from "../redux/requests/chapterRequest";

function EditChapter() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useGetChapterByIdQuery(id);
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Chapter"} />
      <ChapterForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditChapter;
