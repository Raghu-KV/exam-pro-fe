import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";

function Chapters() {
  const [chapterName, setChapterName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (chapterName || allFilter) {
      setQueryParams(
        `?query-params=true${chapterName && chapterName}${
          allFilter && allFilter
        }`
      );
    } else {
      setQueryParams("");
    }
  }, [chapterName, allFilter]);

  console.log(encodeURI(queryParams), "Chapter PARAMS");

  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Chapters"}
        buttonContent={"Add chapter"}
        route={"/auth/chapters/add-chapter"}
      />
      <FilterCompo
        setSearchItem={setChapterName}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        filterDate={true}
        filterSubject={true}
        // // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Chapters;
