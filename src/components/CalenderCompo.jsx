import React from "react";
import { MdPeopleAlt } from "react-icons/md";
import moment from "moment";
function CalenderCompo({ date }) {
  const formatDate = moment(date).format("MMMM D YYYY").split(" ");
  console.log(formatDate, "ll");
  return (
    <div className="flex flex-col min-w-44">
      <div className="bg-gradient-to-tr from-sky-500 to-sky-600 w-full text-white p-1 px-5 py-4 rounded-t-xl h-1/3">
        <p className="font-bold text-center">
          {formatDate[0].toLocaleUpperCase()}
        </p>
      </div>
      <div className="bg-gradient-to-tr from-gray-200 to-gray-300 px-4 rounded-b-xl text-appDarkBlue h-2/3">
        <div className="flex flex-col items-center justify-center mt-1">
          <h3 className="font-bold text-6xl">{formatDate[1]}</h3>
          <div>
            <p className=" font-semibold text-2xl">{formatDate[2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderCompo;
