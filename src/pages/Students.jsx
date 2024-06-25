import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
function Students() {
  const [studentName, setStudentName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

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

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  console.log(encodeURI(queryParams), "SUBJECT PARAMS", currentPage);

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
        heading={"Students"}
        buttonContent={"Add student"}
        route={"/auth/students/add-student"}
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
      <TableCompo
        tableTitle={tableTitle}
        tableData={mockStudentData}
        paginateOptions={paginateOptions}
        setCurrentPage={setCurrentPage}
        handleDeleteItem={handleDeleteItem}
      />
      <div className="h-[200vh]">dddd</div>
    </div>
  );
}

export default Students;
