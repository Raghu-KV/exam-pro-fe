import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdInfo,
  MdCreate,
  MdDelete,
  MdArrowBackIos,
  MdArrowForwardIos,
} from "react-icons/md";

import moment from "moment";

function TableCompo({
  tableTitle,
  tableData,
  paginateOptions,
  setCurrentPage,
  editRoute,
  viewRoute,
  handleDeleteItem,
  isLoading,
  isError,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLoaction = location.pathname.split("/")[2];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (isError) {
    return <h1 className="text-center">Error! Something went wrong</h1>;
  }

  if (tableData?.length == 0) {
    return <h1 className="text-center">No data found</h1>;
  }

  return (
    <div className="m-2">
      <table className="table w-full border-collapse border border-appDarkBlue ">
        <thead className="table-header-group">
          <tr className="table-row bg-appDarkBlue text-appLightGray">
            <th className="table-cell text-left p-3 border-b border-appLightGray border-r w-3">
              S.No
            </th>
            {tableTitle.map((title) => (
              <th
                className={`table-cell text-left p-3 border-b border-appLightGray border-r ${
                  title.className && title.className
                }`}
                key={title.title}
              >
                {title.title}
              </th>
            ))}
            <th className="table-cell text-left p-3 border-b border-appLightGray border-r w-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="table-row-group border-b border-r border-appDarkBlue text-sm">
          {tableData?.map((item, index) => (
            <tr
              className={`table-row hover:bg-slate-200 duration-200 ${
                index % 2 != 0 && `bg-appDarkBlue/10`
              }`}
              key={index}
            >
              <td className="table-cell px-3 py-1 border-b border-appDarkBlue border-r">
                {index + 1}
              </td>

              {tableTitle.map((itemData, i) => (
                <td
                  className="table-cell px-3 py-1 border-b border-appDarkBlue border-r"
                  key={i}
                >
                  {itemData.isDate
                    ? moment(item[itemData.keyName]).format("D/M/YYYY")
                    : item[itemData.keyName]}
                </td>
              ))}

              {/* TABLE ACTIONS */}
              <td className="table-cell px-3 py-1 border-b border-appDarkBlue border-r">
                <div className="flex items-center justify-center">
                  {!["exam-types"].includes(currentLoaction) && (
                    <p
                      className="cursor-pointer text-appGreen px-1 py-1 hover:bg-appGreen/20 duration-150 rounded-xl"
                      onClick={() => navigate(`view/${item._id}`)}
                    >
                      <MdInfo size={25} />
                    </p>
                  )}

                  <p
                    className="cursor-pointer text-appDarkBlue px-1 py-1 hover:bg-appDarkBlue/20 duration-150 rounded-xl"
                    onClick={() => navigate(`edit/${item._id}`)}
                  >
                    <MdCreate size={25} />
                  </p>
                  <p
                    className="cursor-pointer text-red-500 px-1 py-1 hover:bg-red-500/20 duration-150 rounded-xl"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    <MdDelete size={25} />
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* PAGINATION OPTIONS */}
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

export default TableCompo;
