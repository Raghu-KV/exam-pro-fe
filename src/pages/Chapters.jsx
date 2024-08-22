import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import TableCompo from "../components/TableCompo";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetAllChaptersQuery,
  useDeleteChapterMutation,
} from "../redux/requests/chapterRequest";

function Chapters() {
  const [chapterName, setChapterName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (chapterName || allFilter) {
      setQueryParams(
        `&query-params=true${chapterName && chapterName}${
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

  // API CALL
  const [trigger, { isLoading, isError, data, error, isFetching }] =
    useLazyGetAllChaptersQuery();

  useEffect(() => {
    if (queryParams || paginationParams) {
      const fetch = async () => {
        await trigger(`${paginationParams}${queryParams}`).unwrap();
      };
      fetch();
    }
  }, [queryParams, paginationParams]);

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item._id,
      chapterName: item.chapterName,
      subjectName: item.subject.subjectName,
      examType: item.examType.examType,
      createdAt: item.createdAt,
    };
  });

  const tableTitle = [
    { title: "Chapter Name", keyName: "chapterName" },
    { title: "Subject Name", keyName: "subjectName" },
    { title: "Exam exam", keyName: "examType" },
    { title: "Created at", keyName: "createdAt", isDate: true },
  ];

  const mockStudentData = prepareData;

  const paginateOptions = data?.paginateOptions;

  const [deleteChapter] = useDeleteChapterMutation();

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteChapter(id).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
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
        setCurrentPage={setCurrentPage}
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

export default Chapters;
