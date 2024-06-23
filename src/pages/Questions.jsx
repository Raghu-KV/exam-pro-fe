import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";

function Questions() {
  const [question, setQuestion] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (question || allFilter) {
      setQueryParams(
        `?query-params=true${question && question}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [question, allFilter]);

  console.log(encodeURI(queryParams), "QUESTION PARAMS");
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Questions"}
        buttonContent={"Add question"}
        route={"/auth/questions/add-question"}
      />

      <FilterCompo
        setSearchItem={setQuestion}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        filterDate={true}
        filterSubject={true}
        filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Questions;
