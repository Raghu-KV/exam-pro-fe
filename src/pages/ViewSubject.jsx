import PageHeaderComp from "../components/PageHeaderComp";
import FilterCompo from "../components/FilterCompo";
import { useState, useEffect } from "react";
import { useLazyGetSingleSubjectViewQuery } from "../redux/requests/subjectsRequest";
import { useParams } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos, MdAdd } from "react-icons/md";
import LoadingCompo from "../components/LoadingCompo";

function ViewSubject() {
  const { id } = useParams();
  const [subjectName, setSubjectName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");
  const [queryParams, setQueryParams] = useState("");

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
    useLazyGetSingleSubjectViewQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger({
        id: id,
        search: `${paginationParams}${queryParams}`,
      }).unwrap();
    };
    fetch();
  }, [queryParams, paginationParams]);

  const paginateOptions = data?.paginateOptions;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingCompo />;
  }

  return (
    <div className="w-full font-appDarkBlue">
      {isFetching && <LoadingCompo />}
      <PageHeaderComp heading={"View subject"} />

      <div className="bg-gradient-to-tr from-appGreen/80 to-appGreen p-4 w-1/3 rounded-xl text-white ml-4 mt-4">
        <div className="flex flex-col">
          <p className=" font-semibold">Subject name:</p>
          <p className=" font-bold text-3xl">{data?.subjectDoc?.subjectName}</p>
          <p className=" font-semibold mt-2">{`Total question in this chapter : ${data?.totalDocs}`}</p>
        </div>
      </div>

      <div className="px-5 mt-7">
        <p className=" text-appDarkBlue font-bold">{`Chapters in ${data?.subjectDoc?.subjectName}`}</p>
      </div>

      <FilterCompo
        setSearchItem={setSubjectName}
        setAllFilter={setAllFilter}
        // isFilter={true}
        // filterExamType={true}
        // filterDate={true}
        setCurrentPage={setCurrentPage}
        // // filterSubject={true}
        // // filterChapter={true}
        // filterPhoneNumber={true}
        // filterRollNumber={true}
      />

      {data?.docs?.length ? (
        <div className="px-4">
          {data?.docs?.map((item) => (
            <div className="px-4 ">
              <p className="mt-1 p-2 border border-appDarkBlue rounded-lg">
                {item.chapterName}
              </p>
            </div>
          ))}

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
      ) : (
        <p className="p-4">No Chapter</p>
      )}
    </div>
  );
}

export default ViewSubject;
