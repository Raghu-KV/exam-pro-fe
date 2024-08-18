import PageHeaderComp from "../components/PageHeaderComp";
import { useParams } from "react-router-dom";
import { useLazyGetStudentCompletedTestInsightQuery } from "../redux/requests/studentRequest";
import SquareCardCompo from "../components/SquareCardCompo";
import { useEffect, useState } from "react";
import AnswerCompo from "../components/AnswerCompo";
import FilterCompo from "../components/FilterCompo";
import { TbTargetArrow } from "react-icons/tb";
import {
  MdOutlinePlaylistRemove,
  MdOutlineWarningAmber,
  MdOutlineFormatListNumbered,
  MdOutlinePlaylistAddCheck,
  MdOutlineQuiz,
  MdOutlineRemoveDone,
  MdArrowForwardIos,
  MdArrowBackIos,
} from "react-icons/md";

function ViewStudentTestInsight() {
  const { id, testId } = useParams();

  const [question, setQuestion] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");
  const [queryParams, setQueryParams] = useState("");

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

  const [trigger, { isLoading, isError, data, error, isFetching }] =
    useLazyGetStudentCompletedTestInsightQuery();

  console.log(data, "HHHHH");

  useEffect(() => {
    const fetch = async () => {
      await trigger({
        id: id,
        testId: testId,
        filterOptions: `${paginationParams}${queryParams}`,
      }).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const paginateOptions = data?.paginateOptions;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError && error) {
    return <>Error something wenr wrong!!</>;
  }

  return (
    <div className="w-full px-4">
      <PageHeaderComp heading={"View Question"} />
      <div>
        <h1 className="font-bold text-center mt-3 text-3xl">
          {data?.docs?.testInfo?.testName}
        </h1>
        <p className="font-semibold text-appGray text-center mt-1">
          A detail view of the test
        </p>
      </div>
      {/* PERCENT CARD */}
      <div className="grid grid-cols-2 gap-4 mt-3 lg:grid-cols-3">
        <div className="col-span-2 lg:col-span-1">
          <SquareCardCompo
            icon={<TbTargetArrow size={20} />}
            name={"Accuracy"}
            number={`${data?.docs?.accuracyPercent}%`}
          />
        </div>

        <SquareCardCompo
          icon={<MdOutlinePlaylistRemove size={25} />}
          name={"Inaccuracy"}
          number={`${data?.docs?.mistakePercent}%`}
        />

        <SquareCardCompo
          icon={<MdOutlineWarningAmber size={25} />}
          name={"Left alone"}
          number={`${data?.docs?.unattendedPercentage}%`}
        />
      </div>

      {/* TEST INFO CARD */}
      <div className="grid grid-cols-2 text-sm mt-3 gap-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <SquareCardCompo
            icon={<MdOutlineQuiz size={20} />}
            name={"Total question"}
            number={`${data?.docs?.totalQuestions}`}
          />
        </div>
        <SquareCardCompo
          icon={<MdOutlineFormatListNumbered size={20} />}
          name={"Attended question"}
          number={`${data?.docs?.totalAttendedQuestions}`}
        />

        <SquareCardCompo
          icon={<MdOutlineRemoveDone size={20} />}
          name={"Skiped question"}
          number={`${data?.docs?.totalNotAttendedQuestions}`}
        />

        <SquareCardCompo
          icon={<MdOutlinePlaylistAddCheck size={25} />}
          name={"Correct answers"}
          number={`${data?.docs?.totalCorrectAnswers}`}
        />

        <SquareCardCompo
          icon={<MdOutlinePlaylistRemove size={25} />}
          name={"Wrong answers"}
          number={`${data?.docs?.totalWrongAnswers}`}
        />
      </div>

      {/* ALL QUESTIONS */}
      <div className="mb-16">
        <p className="text-center font-semibold mt-4">Questions</p>

        {/* SEARCH & FILTER COMPO */}

        <FilterCompo
          setSearchItem={setQuestion}
          setAllFilter={setAllFilter}
          setCurrentPage={setCurrentPage}
          isFilter={true}
          filterDate={false}
          answerFilter={true}
          filterSubject={true}
          filterChapter={true}
        />

        <div className="mt-4">
          {data?.docs?.answers?.map((answer) => (
            <AnswerCompo key={answer._id} answer={answer} />
          ))}
        </div>

        {/* PAGINATION   */}
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
    </div>
  );
}

export default ViewStudentTestInsight;
