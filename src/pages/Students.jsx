import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetAllStudentsQuery,
  useDeleteStudentMutation,
} from "../redux/requests/studentRequest";
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

  // API CALL
  const [trigger, { isLoading, isError, data, error, isFetching }] =
    useLazyGetAllStudentsQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item._id,
      rollNo: item.rollNo,
      studentName: item.studentName,
      examType: item.enrolledExamType.examType,
      phoneNo: item.phoneNo,
      group: item?.group?.groupName ? item.group.groupName : "No group",
      createdAt: item.createdAt,
    };
  });

  const tableTitle = [
    { title: "Roll No.", keyName: "rollNo" },
    { title: "Student Name", keyName: "studentName" },
    { title: "Group", keyName: "group" },
    { title: "Enrolled exam", keyName: "examType" },
    { title: "Phone No.", keyName: "phoneNo" },
    { title: "Created at", keyName: "createdAt", isDate: true },
  ];

  const mockStudentData = prepareData;

  const paginateOptions = data?.paginateOptions;

  const [deleteStudent] = useDeleteStudentMutation();

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteStudent(id).then((res) => {
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
        filterGroup={true}
        filterPhoneNumber={true}
        filterRollNumber={true}
        setCurrentPage={setCurrentPage}
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

export default Students;
