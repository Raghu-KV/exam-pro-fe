import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetAllSubjectsQuery,
  useDeleteSubjectMutation,
} from "../redux/requests/subjectsRequest";

function Subjects() {
  const [subjectName, setSubjectName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (subjectName || allFilter) {
      setQueryParams(
        `&query-params=true${subjectName && subjectName}${
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

  //  API CALL
  const [trigger, { isLoading, isError, data, error, isFetching }] =
    useLazyGetAllSubjectsQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item._id,
      subjectName: item.subjectName,
      examType: item.examType.examType,
      createdAt: item.createdAt,
    };
  });

  const tableTitle = [
    { title: "Subject Name", keyName: "subjectName" },
    { title: "Exam Type", keyName: "examType" },
    { title: "Created at", keyName: "createdAt", isDate: true },
  ];

  const mockStudentData = prepareData;

  const paginateOptions = data?.paginateOptions;

  const [deleteSubject] = useDeleteSubjectMutation();

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteSubject(id).then((res) => {
        if (res.error) {
          toast.error(`Error`);
        } else {
          toast.success("Successfully deleted student");
        }
      });
      return;
    }

    toast.error("Faild to delete.");
  };

  return (
    <div className="w-full">
      <Toaster />
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
        setCurrentPage={setCurrentPage}
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
        handleDeleteItem={handleDeleteItem}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
      />
    </div>
  );
}

export default Subjects;
