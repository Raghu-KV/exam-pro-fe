import React, { memo } from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import { jwtDecode } from "jwt-decode";
import { useGetDashboardQuery } from "../redux/requests/dashboardRequest";
import SquareCardCompo from "../components/SquareCardCompo";
import BarChartCompo from "../components/BarChartCompo";

function Dashboard() {
  const token = localStorage.getItem("auth-token");
  const decoded = jwtDecode(token);

  const { data, isLoading, isError, error } = useGetDashboardQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <PageHeaderComp heading={"Dashboard"} />
      <div className="px-4">
        <div className="pt-4 px-4">
          <h1 className="font-bold text-2xl">
            <span className="text-appGray text-lg mr-2">Welcome</span>
            {decoded.userInfo.userName}
          </h1>
        </div>

        <div className="flex flex-wrap mt-2 justify-center items-center gap-4 mb-3">
          <div className="basis-2/6">
            <SquareCardCompo
              name={"Total Overall Students"}
              number={data?.totalStudents}
            />
          </div>

          {data?.totalStudentForExamType?.map((item) => (
            <div className="basis-1/5" key={item.examTypeId}>
              <SquareCardCompo
                name={`Total Student for ${item.examType}`}
                number={item?.count}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-0 mt-5">
          {data?.insightData.map((data) => (
            <div className="basis-2/4 h-[40vh] w-full" key={data._id}>
              <BarChartCompo data={[data]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
