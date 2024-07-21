import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import TableCompo from "../components/TableCompo";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Questions() {
  const [question, setQuestion] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (question || allFilter) {
      setQueryParams(
        `?query-params=true${question && question}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [question, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  const tableTitle = [
    { title: "Question", keyName: "question" },
    { title: "Options", keyName: "options" },
    { title: "Answer", keyName: "answer" },
    { title: "Chapter", keyName: "chapter" },
    { title: "Subject", keyName: "subject" },
    { title: "Exam type", keyName: "examType" },
    { title: "Created at", keyName: "createdAt" },
  ];

  const mockStudentData = [
    {
      _id: "ugiuguiwqgdqiuwgqwiudg",
      question:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta consectetur recusandae odio quam nam blanditiis maxime molestiae omnis eveniet laboriosam distinctio nostrum aut est, dolor provident reiciendis magnam veritatis porro?",
      options: [
        "Algebra",
        " | ",
        "Trignomentory",
        " | ",
        "Algebsdfsdfsdfsdra",
        " | ",
        "Trignomsdfsdfentory",
      ],
      answer: "Algebra",
      chapter: "Algebra",
      subject: "Maths",
      examType: "NEET",
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

  console.log(encodeURI(queryParams), "QUESTION PARAMS");
  return (
    <div className="w-full">
      <Toaster />
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
        setCurrentPage={setCurrentPage}
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

export default Questions;
