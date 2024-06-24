import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";

function Students() {
  const [studentName, setStudentName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (studentName || allFilter) {
      setQueryParams(
        `?query-params=true${studentName && studentName}${
          allFilter && allFilter
        }`
      );
    } else {
      setQueryParams("");
    }
  }, [studentName, allFilter]);

  console.log(encodeURI(queryParams), "SUBJECT PARAMS");

  const tableTitle = [
    { title: "Roll No.", keyName: "rollNo" },
    { title: "Student Name", keyName: "studentName" },
    { title: "Enrolled exam", keyName: "examType" },
    { title: "Phone No.", keyName: "phoneNo" },
    { title: "Created at", keyName: "createdAt" },
  ];

  const mockStudentData = [
    {
      _id: "ugiuguiwqgdqiuwgqwiudg",
      rollNo: "123",
      studentName: "Student name",
      examType: "NEET",
      phoneNo: "9872547632",
      createdAt: "10-10-24",
    },
  ];

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
      <TableCompo tableTitle={tableTitle} tableData={mockStudentData} />
      <div className="h-[200vh]">dddd</div>
    </div>
  );
}

export default Students;
