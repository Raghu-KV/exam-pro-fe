import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetAllTestsQuery,
  useDeleteTestMutation,
} from "../redux/requests/testTypesRequest";

function TestTypes() {
  const [testType, setTestType] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (testType || allFilter) {
      setQueryParams(
        `&query-params=true${testType && testType}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [testType, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  // API CALL
  const [trigger, { isLoading, isError, data, error }] =
    useLazyGetAllTestsQuery();

  console.log(data, "TEST_DATA");

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const publishedTrueJsx = (
    <span className="bg-green-500 rounded-lg py-[5px] px-[14px]  text-white">
      Published
    </span>
  );

  const publishedFalseJsx = (
    <span className="bg-red-500 rounded-lg py-[5px] px-[14px]  text-white">
      Not Published
    </span>
  );

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item._id,
      testName: item.testName,
      examType: item.examType.examType,
      isPublished: item.isPublished ? publishedTrueJsx : publishedFalseJsx,
      publishedAt: item.publishedAt ? item.publishedAt : "",
    };
  });

  const tableTitle = [
    { title: "Test Name", keyName: "testName" },
    { title: "Exam type", keyName: "examType" },
    { title: "Published", keyName: "isPublished" },
    // { title: "Total QU", keyName: "totalQuestions" },
    { title: "Published at", keyName: "publishedAt", isDate: true },
    // { title: "Attended No.", keyName: "attendedNo" },
  ];

  const mockStudentData = prepareData;

  const paginateOptions = data?.paginateOptions;

  const [deleteTest] = useDeleteTestMutation();

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteTest(id).then((res) => {
        if (res.error) {
          console.log(res);
          toast.error(res.error.data.message);
        } else {
          toast.success("Successfully deleted Test");
        }
      });
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
        setCurrentPage={setCurrentPage}
        // filterSubject={true}
        // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
        filterPublish={true}
      />
      <TableCompo
        tableTitle={tableTitle}
        tableData={mockStudentData}
        paginateOptions={paginateOptions}
        setCurrentPage={setCurrentPage}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default TestTypes;
