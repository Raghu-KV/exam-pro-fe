// import PageHeaderComp from "./components/PageHeaderComp";

import FilterCompo from "./FilterCompo";
import TableCompo from "./TableCompo";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetAllQuestionQuery,
  useDeleteQuestionMutation,
} from "../redux/requests/question.request";

import { useParams } from "react-router-dom";

import { useLazyGetAllQuestionsForTestQuery } from "../redux/requests/testTypesRequest";

function ViewQuestionComp() {
  const [question, setQuestion] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (question || allFilter) {
      setQueryParams(
        `&query-params=true${question && question}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [question, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  // API CALL
  const [trigger, { isLoading, isError, data, error }] =
    useLazyGetAllQuestionsForTestQuery();

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
      question: item?.question,
      answer: item?.options[item.answerId]?.option,
      chapter: item?.chapter?.chapterName,
      subject: item?.subject?.subjectName,
    };
  });

  const tableTitle = [
    { title: "Question", keyName: "question" },
    { title: "Answer", keyName: "answer" },
    { title: "Chapter", keyName: "chapter" },
    { title: "Subject", keyName: "subject" },
  ];

  const mockStudentData = prepareData;

  const paginateOptions = data?.paginateOptions;

  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDeleteItem = async (id) => {
    const permission = prompt(`are you sure want to delete ?  if yes type "Y"`);
    if (permission && permission.toLowerCase() == "y") {
      await deleteQuestion(id).then((res) => {
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
    <div className="w-full border-b pb-1 border-appDarkBlue">
      <Toaster />

      <FilterCompo
        setSearchItem={setQuestion}
        setAllFilter={setAllFilter}
        isFilter={true}
        // filterExamType={true}
        // filterDate={true}
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
        isLoading={isLoading}
        isError={isError}
        isActions={false}
      />
    </div>
  );
}

export default ViewQuestionComp;
