import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import TableCompo from "../components/TableCompo";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useLazyGetAllQuestionQuery,
  useDeleteQuestionMutation,
} from "../redux/requests/question.request";

function Questions() {
  const [question, setQuestion] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  useEffect(() => {
    if (question || allFilter) {
      setQueryParams(
        `?query-params=true${question && question}${allFilter && allFilter}`
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
    useLazyGetAllQuestionQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const prepareData = data?.docs.map((item) => {
    return {
      _id: item._id,
      question: item.question,
      answer: item.options[item.answerId].option,
      chapter: item.chapter.chapterName,
      subject: item.subject.subjectName,
      examType: item.examType.examType,
      createdAt: item.createdAt,
    };
  });

  const tableTitle = [
    { title: "Question", keyName: "question" },
    { title: "Answer", keyName: "answer" },
    { title: "Chapter", keyName: "chapter" },
    { title: "Subject", keyName: "subject" },
    { title: "Exam type", keyName: "examType" },
    { title: "Created at", keyName: "createdAt", isDate: true },
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
  console.log(isLoading, "kkkkkk");
  return (
    <div className="w-full">
      <Toaster />
      <PageHeaderComp
        heading={"Questions"}
        buttonContent={"Add question"}
        route={"/auth/questions/add-question"}
      />

      <FilterCompo
        setSearchItem={setQuestion}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        filterDate={true}
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
      />
    </div>
  );
}

export default Questions;
