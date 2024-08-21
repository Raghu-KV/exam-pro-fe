import FilterCompo from "./FilterCompo";
import TableCompo from "./TableCompo";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLazyGetAllIncompleteStudentsQuery } from "../redux/requests/testTypesRequest";
import { useParams } from "react-router-dom";
import LoadingCompo from "./LoadingCompo";

function ViewIncompleteStudents() {
  const [studentName, setStudentName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (studentName || allFilter) {
      setQueryParams(
        `&query-params=true${studentName && studentName}${
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
    useLazyGetAllIncompleteStudentsQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger({
        id: id,
        filterOptions: `${paginationParams}${queryParams}`,
      }).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item?._id,
      studentName: item?.studentName,
      examType: item?.enrolledExamType?.examType,
      group: item?.group?.groupName,
      rollNo: item?.rollNo,
    };
  });

  const tableTitle = [
    { title: "Roll No", keyName: "rollNo" },
    { title: "Student Name", keyName: "studentName" },
    { title: "Group", keyName: "group" },
    { title: "Exam Type", keyName: "examType" },
  ];

  const paginateOptions = data?.paginateOptions;

  return (
    <div className="w-full border-b pb-1 border-appDarkBlue">
      {isFetching && <LoadingCompo />}
      <Toaster />

      <FilterCompo
        setSearchItem={setStudentName}
        setAllFilter={setAllFilter}
        isFilter={true}
        // filterExamType={true}
        // filterDate={true}
        // filterSubject={true}
        // filterChapter={true}
        filterGroup={true}
        setCurrentPage={setCurrentPage}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />
      <TableCompo
        tableTitle={tableTitle}
        tableData={prepareData}
        paginateOptions={paginateOptions}
        setCurrentPage={setCurrentPage}
        // handleDeleteItem={handleDeleteItem}
        isLoading={isLoading}
        isError={isError}
        isActions={false}
      />
    </div>
  );
}

export default ViewIncompleteStudents;
