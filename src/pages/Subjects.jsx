import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";

function Subjects() {
  const [subjectName, setSubjectName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (subjectName || allFilter) {
      setQueryParams(
        `?query-params=true${subjectName && subjectName}${
          allFilter && allFilter
        }`
      );
    } else {
      setQueryParams("");
    }
  }, [subjectName, allFilter]);

  console.log(encodeURI(queryParams), "SUBJECT PARAMS");

  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Subjects"}
        buttonContent={"Add subject"}
        route={"/auth/subjects/add-subject"}
      />

      <FilterCompo
        setSearchItem={setSubjectName}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        filterDate={true}
        // // filterSubject={true}
        // // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Subjects;
