import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";

function ExamTypes() {
  const [examType, setExamType] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (examType || allFilter) {
      setQueryParams(
        `?query-params=true${examType && examType}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [examType, allFilter]);

  console.log(encodeURI(queryParams), "EXAM TYPES PARAMS");

  const tableTitle = [
    { title: "Exam Type", keyName: "examType" },
    { title: "Created at", keyName: "createdAt" },
  ];

  const mockStudentData = [
    {
      _id: "ugiuguiwqgdqiuwgqwiudg",
      examType: "NEET",
      createdAt: "10-10-24",
    },
  ];

  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Exam Types"}
        buttonContent={"Add exam type"}
        route={"/auth/exam-types/add-exam-type"}
      />
      <FilterCompo
        setSearchItem={setExamType}
        setAllFilter={setAllFilter}
        isFilter={false}
        // filterExamType={true}
        // filterDate={true}
        // // filterSubject={true}
        // // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />

      <TableCompo tableTitle={tableTitle} tableData={mockStudentData} />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default ExamTypes;
