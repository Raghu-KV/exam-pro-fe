import React from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import ChapterForm from "../components/ChapterForm";

function EditChapter() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Chapter"} />
      <ChapterForm />
    </div>
  );
}

export default EditChapter;
