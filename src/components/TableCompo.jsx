import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdInfo,
  MdCreate,
  MdDelete,
  MdArrowBackIos,
  MdArrowForwardIos,
} from "react-icons/md";

function TableCompo({ tableTitle, tableData }) {
  const navigate = useNavigate();

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
          {tableData.map((item, index) => (
            <tr
              className={`table-row hover:bg-slate-200 duration-200 ${
                index % 2 != 0 && `bg-appDarkBlue/10`
              }`}
            >
              <td className="table-cell px-3 py-1 border-b border-appDarkBlue border-r">
                {index + 1}
              </td>

              {tableTitle.map((itemData, i) => (
                <td className="table-cell px-3 py-1 border-b border-appDarkBlue border-r">
                  {item[itemData.keyName]}
                </td>
              ))}

              <td className="table-cell px-3 py-1 border-b border-appDarkBlue border-r">
                <div className="flex items-center justify-center">
                  <p
                    className="cursor-pointer text-appGreen px-1 py-1 hover:bg-appGreen/20 duration-150 rounded-xl"
                    onClick={() => navigate(`/auth/students/view/${item._id}`)}
                  >
                    <MdInfo size={25} />
                  </p>
                  <p
                    className="cursor-pointer text-appDarkBlue px-1 py-1 hover:bg-appDarkBlue/20 duration-150 rounded-xl"
                    onClick={() => navigate(`/auth/students/edit/${item._id}`)}
                  >
                    <MdCreate size={25} />
                  </p>
                  <p className="cursor-pointer text-red-500 px-1 py-1 hover:bg-red-500/20 duration-150 rounded-xl">
                    <MdDelete size={25} />
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* PAGINATION OPTIONS */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-sm">
            Showing <span className="font-semibold text-base">1</span> of{" "}
            <span className="font-semibold text-base">10</span> pages
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 text-sm">
          <div className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer">
            <MdArrowBackIos size={15} />
            <p>Prev</p>
          </div>
          <div className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer">
            <p>1</p>
          </div>
          <div className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer">
            <p>2</p>
          </div>
          <div className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer">
            <p>3</p>
          </div>
          <div className="flex items-center p-1 border border-appDarkBlue hover:bg-appDarkBlue/10 cursor-pointer">
            <p>Next</p>
            <MdArrowForwardIos size={15} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableCompo;
