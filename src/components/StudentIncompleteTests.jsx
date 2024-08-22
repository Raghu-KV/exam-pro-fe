import FilterCompo from "./FilterCompo";
import SingleCard from "./SingleCard";
import { useState, useEffect } from "react";
import { useLazyGetStudentIncompleteTestsQuery } from "../redux/requests/studentRequest";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useParams } from "react-router-dom";
import LoadingCompo from "./LoadingCompo";

function StudentIncompleteTests() {
  const { id } = useParams();

  const [testName, setTestName] = useState("");
  const [allFilter, setAllFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationParams, setPaginationParams] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    if (testName || allFilter) {
      setQueryParams(
        `&query-params=true${testName && testName}${allFilter && allFilter}`
      );
    } else {
      setQueryParams("");
    }
  }, [testName, allFilter]);

  useEffect(() => {
    setPaginationParams(`?page=${currentPage}`);
  }, [currentPage]);

  //  API CALL
  const [trigger, { isLoading, isError, data: responce, error }] =
    useLazyGetStudentIncompleteTestsQuery();

  useEffect(() => {
    if (queryParams || paginationParams) {
      const fetch = async () => {
        await trigger({
          id: id,
          filterOptions: `${paginationParams}${queryParams}`,
        }).unwrap();
      };
      fetch();
    }
  }, [queryParams, paginationParams]);

  const data = responce?.docs;
  const paginateOptions = responce?.paginateOptions;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingCompo />;
  }
  return (
    <div className="font-inter mb-16 px-4">
      <p className=" font-bold text-center text-3xl mt-4">
        Tests that are yet to be taken by the student
      </p>
      {/* SEARCH COMPO */}
      <FilterCompo
        setSearchItem={setTestName}
        setAllFilter={setAllFilter}
        setCurrentPage={setCurrentPage}
        isFilter={true}
        filterDate={true}
      />

      {data?.length ? (
        <div className="grid grid-cols-1 gap-3 mt-6 lg:gap-6 lg:grid-cols-3">
          {data?.map((item) => (
            <SingleCard data={item} key={item._id} isButton={false} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center font-semibold">No data</p>
      )}

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

export default StudentIncompleteTests;
