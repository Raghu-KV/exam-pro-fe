import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";

function Chapters() {
  const [chapterName, setChapterName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

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

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

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

  return (
    <div className="w-full">
      <Toaster />
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

export default Chapters;
