import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";

function TestTypes() {
  const [testType, setTestType] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (testType || allFilter) {
      setQueryParams(
        `?query-params=true${testType && testType}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [testType, allFilter]);

  console.log(encodeURI(queryParams), "TEST PARAMS");
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Test Types"}
        buttonContent={"Add test type"}
        route={"/auth/test-types/add-test-type"}
      />

      <FilterCompo
        setSearchItem={setTestType}
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

export default TestTypes;
