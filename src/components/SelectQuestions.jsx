import FilterCompo from "./FilterCompo";
import TableCompo from "./TableCompo";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLazyGetAllQuestionQuery } from "../redux/requests/question.request";
import WideCard from "./WideCard";
import { MdArrowBackIos, MdArrowForwardIos, MdAdd } from "react-icons/md";
import { addQuestions } from "../redux/reducers/prepareQuestion-reducer";
import { useDispatch, useSelector } from "react-redux";

function SelectQuestions({ setChanged }) {
  const [question, setQuestion] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");

  const dispatch = useDispatch();

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
    useLazyGetAllQuestionQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger(`${paginationParams}${queryParams}`).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const paginateOptions = data?.paginateOptions;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddQuestion = (data) => {
    setChanged(true);
    dispatch(addQuestions(data));
    toast.success("Successfully added question");
  };

  // CHECKING WHEATHER THE QUESTION IS PRESENT IN REDUX OR NOT ++++++
  const allQuestions = useSelector((state) => state.prepareQuestions.value);
  const onlyIds = allQuestions.map((item) => item.questionId);

  return (
    <div className="w-full">
      <FilterCompo
        setSearchItem={setQuestion}
        setAllFilter={setAllFilter}
        isFilter={true}
        filterExamType={true}
        // filterDate={true}
        filterSubject={true}
        filterChapter={true}
        setCurrentPage={setCurrentPage}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />

      <div className="flex flex-col gap-2 px-2">
        {data?.docs?.map((item) => (
          <WideCard
            key={item._id}
            data={item}
            btnContent={
              onlyIds.includes(item.questionId) ? "Already selected" : "Add"
            }
            btnDisabled={onlyIds.includes(item.questionId)}
            btnIcon={!onlyIds.includes(item.questionId) && <MdAdd size={25} />}
            btnClassName={`flex  text-white font-medium text-sm px-2 rounded-lg items-center 
              ${
                onlyIds.includes(item.questionId)
                  ? "bg-appGray cursor-no-drop"
                  : "bg-appGreen hover:bg-appGreen/90"
              }`}
            onClick={() => handleAddQuestion(item)}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-2 px-5">
        <div>
          <p className="text-sm">
            Showing{" "}
            <span className="font-semibold text-base">
              {paginateOptions?.currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-base">
              {paginateOptions?.totalPage}
            </span>{" "}
            pages
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 text-sm">
          {paginateOptions?.hasPrevPage && (
            <div
              className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer"
              onClick={() => setCurrentPage((prv) => prv - 1)}
            >
              <MdArrowBackIos size={15} />
              <p>Prev</p>
            </div>
          )}

          <>
            {paginateOptions?.hasPrevPage && (
              <div
                className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer"
                onClick={() =>
                  handlePageChange(paginateOptions.currentPage - 1)
                }
              >
                <p>{paginateOptions.currentPage - 1}</p>
              </div>
            )}

            <div
              className="flex items-center p-1 border bg-appDarkBlue cursor-pointer text-white"
              onClick={() => handlePageChange(paginateOptions?.currentPage)}
            >
              <p>{paginateOptions?.currentPage}</p>
            </div>

            {paginateOptions?.hasNextPage && (
              <div
                className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer"
                onClick={() =>
                  handlePageChange(paginateOptions.currentPage + 1)
                }
              >
                <p>{paginateOptions.currentPage + 1}</p>
              </div>
            )}
          </>

          {paginateOptions?.hasNextPage && (
            <div
              className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer"
              onClick={() => setCurrentPage((prv) => prv + 1)}
            >
              <p>Next</p>
              <MdArrowForwardIos size={15} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectQuestions;
