import { useParams } from "react-router-dom";
import {
  useGetStudentDetailViewQuery,
  useResetPasswordMutation,
} from "../redux/requests/studentRequest";
import SquareCardCompo from "./SquareCardCompo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MdOutlinePlaylistRemove,
  MdOutlineWarningAmber,
  MdOutlineFormatListNumbered,
  MdOutlineRemoveDone,
  MdOutlineLockReset,
} from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";

function SingleStudentDashboardComp() {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError } =
    useGetStudentDetailViewQuery(id);

  const [resetPassword, { isLoading: resetPasswordIsLoading }] =
    useResetPasswordMutation();

  const handleResetPassword = async () => {
    try {
      const res = await resetPassword(id).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const LineChartData = data?.latestAnswersData?.map((item) => {
    return {
      name: item.testInfo.testName,
      ["Accuracy Percentage"]: item.accuracyPercent.toFixed(2),
      ["Incorrect Percentage"]: item.mistakePercent.toFixed(2),
      ["Skipped Percentage"]: item.unattendedPercentage.toFixed(2),
    };
  });

  const pieChartData = [
    {
      name: "Average Accuracy Percentage",
      value: Math.round(data?.insightData[0]?.avgAccuracyPercent),
    },

    {
      name: "Average Incorrect Percentage",
      value: Math.round(data?.insightData[0]?.avgMistakePercent),
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="font-inter text-appDarkBlue mt-8 mb-8 px-5">
      <Toaster />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* STUDENT DATA */}
        <div className="border border-appLightGray rounded-xl">
          <div className="p-4 gap-4 lg:flex">
            {/* NAME BATCH */}
            <div className=" rounded-full bg-appGray items-center justify-center hidden w-44 h-44 lg:flex">
              <p className="text-7xl font-bold text-white/50">
                {data?.studentData?.studentName[0].toUpperCase()}
              </p>
            </div>
            {/* STUDENT DETAILS */}
            <div>
              <p className="text-xl font-semibold">
                {data?.studentData?.studentName}
              </p>

              <p className="font-semibold mt-3 text-sm lg:text-base">
                Roll No : {data?.studentData?.rollNo}
              </p>
              <p className="font-semibold text-sm lg:text-base">
                Group : {data?.studentData?.group?.groupName}
              </p>
              <p className="font-semibold text-sm lg:text-base">
                Exam type : {data?.studentData?.enrolledExamType?.examType}
              </p>

              <button
                className="font-semibold px-4 py-2 bg-appGreen text-white rounded-full mt-3 duration-200 hover:bg-appGreen/90 text-sm flex justify-center items-center gap-1"
                onClick={() => handleResetPassword()}
                disabled={resetPasswordIsLoading}
              >
                <MdOutlineLockReset size={25} />
                <p>
                  {" "}
                  {resetPasswordIsLoading ? "Loading..." : " Reset Password"}
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between">
          <div>
            <SquareCardCompo
              icon={<MdOutlineFormatListNumbered size={20} />}
              name={"Total Attended Tests"}
              number={`${data?.attendedTestsNo}`}
            />
          </div>

          <div>
            <SquareCardCompo
              icon={<MdOutlineRemoveDone size={20} />}
              name={"Yet to Attended Tests"}
              number={`${data?.notAttendedTestNo}`}
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-1 gap-4 lg:grid-cols-2 mt-8">
        {/* LINE CHART */}
        <div className="border border-appLightGray  p-5 rounded-xl">
          <p className="text-center font-semibold mb-2">
            Latest tests performance
          </p>
          <div className="h-[50vh]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              style={{ height: "50vh" }}
            >
              <LineChart
                width={500}
                height={300}
                data={LineChartData}
                isAnimationActive={true}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Accuracy Percentage"
                  stroke=" rgb(40 127 113)"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Incorrect Percentage"
                  stroke="rgb(239 68 68)"
                />
                <Line
                  type="monotone"
                  dataKey="Skipped Percentage"
                  stroke="rgb(17 23 41)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* PIE CHART */}
        <div className="border border-appLightGray p-5 rounded-xl">
          <p className="text-center font-semibold mb-2">
            All tests performance
          </p>
          <div className="h-[50vh]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={pieChartData}
                  innerRadius={0}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  <Cell fill={"rgb(40 127 113)"} />
                  <Cell fill={"rgb(239 68 68)"} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 mt-4 gap-4">
        <div>
          <SquareCardCompo
            icon={<TbTargetArrow size={20} />}
            name={"Total Accuracy Percentage"}
            number={`${data?.insightData[0]?.avgAccuracyPercent.toFixed(2)}%`}
          />
        </div>
        <div>
          <SquareCardCompo
            icon={<MdOutlinePlaylistRemove size={20} />}
            name={"Total Incorrect Percentage"}
            number={`${data?.insightData[0]?.avgMistakePercent.toFixed(2)}%`}
          />
        </div>
        <div>
          <SquareCardCompo
            icon={<MdOutlineWarningAmber size={20} />}
            name={"Total Unattended Tests"}
            number={`${data?.insightData[0]?.avgUnattendedPercent.toFixed(2)}%`}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleStudentDashboardComp;
