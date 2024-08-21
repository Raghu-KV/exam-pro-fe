import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetExamTypeQuery,
  useDeleteExamTypeMutation,
} from "../redux/requests/examTypeRequest";

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
  const [trigger, { isLoading, isError, data, error, isFetching }] =
    useLazyGetExamTypeQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const [deleteExamType] = useDeleteExamTypeMutation();

  const tableTitle = [
    { title: "Exam Type", keyName: "examType" },
    { title: "Created at", keyName: "createdAt", isDate: true },
  ];

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteExamType(id).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
        } else {
          toast.success("Successfully deleted examtype");
        }
      });

      return;
    }
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
        isFetching={isFetching}
        paginateOptions={data?.paginateOptions}
        setCurrentPage={setCurrentPage}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default ExamTypes;
