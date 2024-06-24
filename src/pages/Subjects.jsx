import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";

function Subjects() {
  const [subjectName, setSubjectName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

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

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  console.log(encodeURI(queryParams), "SUBJECT PARAMS");

  const tableTitle = [
    { title: "Subject Name", keyName: "subjectName" },
    { title: "Exam exam", keyName: "examType" },
    { title: "Created at", keyName: "createdAt" },
  ];

  const mockStudentData = [
    {
      _id: "ugiuguiwqgdqiuwgqwiudg",
      subjectName: "Maths",
      examType: "NEET",
      createdAt: "10-10-24",
    },
  ];

  const paginateOptions = {
    currentPage: 10,
    totalPage: 12,
    hasNextPage: true,
    hasPrevPage: true,
  };

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
      <TableCompo
        tableTitle={tableTitle}
        tableData={mockStudentData}
        paginateOptions={paginateOptions}
        setCurrentPage={setCurrentPage}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Subjects;
