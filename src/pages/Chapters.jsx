import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";

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

  const tableTitle = [
    { title: "Chapter Name", keyName: "chapterName" },
    { title: "Subject Name", keyName: "subjectName" },
    { title: "Exam exam", keyName: "examType" },
    { title: "Created at", keyName: "createdAt" },
  ];

  const mockStudentData = [
    {
      _id: "ugiuguiwqgdqiuwgqwiudg",
      chapterName: "Algbra",
      subjectName: "Maths",
      examType: "NEET",
      createdAt: "10-10-24",
    },
  ];

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
      <TableCompo tableTitle={tableTitle} tableData={mockStudentData} />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Chapters;
