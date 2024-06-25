import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";

function TestTypes() {
  const [testType, setTestType] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (testType || allFilter) {
      setQueryParams(
        `?query-params=true${testType && testType}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [testType, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  const tableTitle = [
    { title: "Test Name", keyName: "testType" },
    { title: "Chapter covered", keyName: "chapterCovered" },
    { title: "Subject coverd", keyName: "subjectCovered" },
    { title: "Exam type", keyName: "examType" },
    { title: "Attended No.", keyName: "attendedNo" },
    { title: "Total questions", keyName: "totalQuestions" },
    { title: "Created at", keyName: "createdAt" },
  ];

  const mockStudentData = [
    {
      _id: "ugiuguiwqgdqiuwgqwiudg",
      testType: "NEET-SAMPLE",
      chapterCovered: ["Algebra", " | ", "Trignomentory"],
      subjectCovered: ["Maths"],
      examType: "NEET",
      attendedNo: "10/12",
      totalQuestions: "40",
      createdAt: "10-02-24",
    },
  ];

  const paginateOptions = {
    currentPage: 10,
    totalPage: 12,
    hasNextPage: true,
    hasPrevPage: true,
  };

  const handleDeleteItem = (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      toast.success(`DELETE API CALL ${id}`);
      return;
    }

    toast.error("Faild to delete.");
  };

  console.log(encodeURI(queryParams), "TEST PARAMS");
  return (
    <div className="w-full">
      <Toaster />
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
      <TableCompo
        tableTitle={tableTitle}
        tableData={mockStudentData}
        paginateOptions={paginateOptions}
        setCurrentPage={setCurrentPage}
        handleDeleteItem={handleDeleteItem}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default TestTypes;
