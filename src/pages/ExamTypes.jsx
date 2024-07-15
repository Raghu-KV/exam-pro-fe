import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
import { useLazyGetExamTypeQuery } from "../redux/requests/examTypeRequest";

function ExamTypes() {
  const [examType, setExamType] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (examType || allFilter) {
      setQueryParams(
        `&query-params=true${examType && examType}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [examType, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  // API CALL
  const [trigger, { isLoading, isError, data, error }] =
    useLazyGetExamTypeQuery();
  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const tableTitle = [
    { title: "Exam Type", keyName: "examType" },
    { title: "Created at", keyName: "createdAt", isDate: true },
  ];

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
        heading={"Exam Types"}
        buttonContent={"Add exam type"}
        route={"/auth/exam-types/add-exam-type"}
      />
      <FilterCompo
        setSearchItem={setExamType}
        setAllFilter={setAllFilter}
        setCurrentPage={setCurrentPage}
        isFilter={false}
        // filterExamType={true}
        // filterDate={true}
        // // filterSubject={true}
        // // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />

      <TableCompo
        tableTitle={tableTitle}
        tableData={data?.docs}
        isLoading={isLoading}
        isError={isError}
        paginateOptions={data?.paginateOptions}
        setCurrentPage={setCurrentPage}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default ExamTypes;
