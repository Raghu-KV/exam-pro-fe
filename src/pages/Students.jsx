import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";

function Students() {
  const [studentName, setStudentName] = useState("");
  const [allFilter, setAllFilter] = useState("");

  let queryParams = ``;
  if (studentName || allFilter) {
    queryParams = `?query-params=true${studentName && studentName}${
      allFilter && allFilter
    }`;
  } else {
    queryParams = null;
  }

  // filterExamType,
  // filterDate,
  // filterSubject,
  // filterChapter,
  // filterRollNumber,
  // filterPhoneNumber,

  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Students"}
        buttonContent={"Add student"}
        route={"/auth/student/add-student"}
      />
      <FilterCompo
        setSearchItem={setStudentName}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        filterDate={true}
        // filterSubject={true}
        // filterChapter={true}
        filterPhoneNumber={true}
        filterRollNumber={true}
      />
      <div className="h-[200vh]">dddd</div>
    </div>
  );
}

export default Students;
