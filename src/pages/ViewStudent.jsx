import React, { useState } from "react";
import PageHeaderComp from "./../components/PageHeaderComp";
import SingleStudentDashboardComp from "../components/SingleStudentDashboardComp";
import StudentCompleteTestCompo from "../components/StudentCompleteTestCompo";
import StudentIncompleteTests from "../components/StudentIncompleteTests";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

function ViewStudent() {
  const [isCompletedTests, setIsCompletedTests] = useState(true);
  const [showTestData, setShowTestData] = useState(false);

  const toggleTestData = () => setShowTestData((prev) => !prev);
  const switchTestType = (isCompleted) => setIsCompletedTests(isCompleted);

  return (
    <div className="w-full">
      <PageHeaderComp heading="View Student" />
      <SingleStudentDashboardComp />

      <div className="pb-2 border-b border-appDarkBlue flex justify-between items-center mx-4 mb-10">
        <h2 className="font-bold text-2xl text-appDarkBlue">
          Student Test Info
        </h2>
        <div
          className="rotate-2 bg-appLightGray/40 rounded-full p-1 hover:bg-appLightGray/60 duration-200 mr-4 cursor-pointer"
          onClick={toggleTestData}
        >
          {showTestData ? (
            <MdExpandLess size={30} />
          ) : (
            <MdExpandMore size={30} />
          )}
        </div>
      </div>

      {showTestData && (
        <div className="flex justify-center items-center gap-5">
          <Button
            isActive={isCompletedTests}
            onClick={() => switchTestType(true)}
            label="Completed tests"
          />
          <Button
            isActive={!isCompletedTests}
            onClick={() => switchTestType(false)}
            label="Incomplete tests"
          />
        </div>
      )}

      {showTestData && (
        <>
          {isCompletedTests ? (
            <StudentCompleteTestCompo />
          ) : (
            <StudentIncompleteTests />
          )}
        </>
      )}
    </div>
  );
}

const Button = ({ isActive, onClick, label }) => (
  <button
    className={`block font-semibold px-4 py-1 rounded-lg ${
      isActive
        ? "bg-appGreen text-white"
        : "border border-appLightGray hover:bg-appLightGray/40"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ViewStudent;
