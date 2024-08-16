import { useGetSingleTestQuery } from "../redux/requests/testTypesRequest";
import { useParams } from "react-router-dom";
import PageHeaderComp from "../components/PageHeaderComp";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { MdDone } from "react-icons/md";
import TimingCompo from "../components/TimingCompo";
import { MdPeopleAlt } from "react-icons/md";

import CalenderCompo from "../components/CalenderCompo";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useState } from "react";
import ViewQuestionComp from "../components/ViewQuestionsComp";
import { MdOutlineQuestionMark, MdBallot } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useChagePublishMutation } from "../redux/requests/testTypesRequest";
import toast, { Toaster } from "react-hot-toast";

function ViewTest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTestQuery(id);

  const [openQuestions, setOpenQuestions] = useState(false);

  const [changePublish, { isLoading: changePublishLoading }] =
    useChagePublishMutation();

  const handlePublish = async () => {
    await changePublish(id).then((res) => {
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  const buttonContent = data?.isPublished ? "Hold Test" : "Publish Test";

  // const { data: allQues } = useGetAllQuestionNoPagenationQuery(id);

  const handlePrepareQuestion = async () => {
    navigate(`/auth/test-types/prepare-questions/${id}`, {
      state: { from: "/" },
      replace: true,
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full mb-8">
      <Toaster />
      <PageHeaderComp heading={"View Test"} />
      <div className="px-5 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-appGray">Test name:</p>
            <p className="font-bold text-4xl text-appDarkBlue">
              {data?.testName}
            </p>
            <p className="font-semibold text-appGray mt-4">Groups:</p>
            {data?.group.map((item) => (
              <p className="font-bold text-appDarkBlue inline-block px-2 border-r border-appLightGray">
                {item?.groupName}
              </p>
            ))}
          </div>

          <div>
            <p className="mb-1 font-semibold text-appGray">Test status:</p>
            {data?.isPublished ? (
              <div className="p-2 flex items-center gap-2  bg-green-600 rounded-xl text-white font-semibold">
                <MdDone size={25} />
                <p className=" text-xl"> Published</p>
              </div>
            ) : (
              <div className="p-2 flex items-center gap-2  bg-red-600 rounded-xl text-white font-semibold">
                <MdDoNotDisturbAlt size={25} />
                <p className=" text-xl">Not Published</p>
              </div>
            )}
          </div>
        </div>
        {/* TEST timing copo */}
        <div className="mt-3 flex justify-between">
          <TimingCompo paramId={id} testTiming={data?.testTiming} />

          <div className="flex gap-5">
            <div className="flex flex-col">
              <div className="bg-gradient-to-tr from-gray-200 to-gray-300 p-4 rounded-t-xl text-appDarkBlue">
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <MdPeopleAlt size={60} />
                  </div>
                  <div>
                    <p className=" font-bold text-2xl">
                      {data?.attendedStudentsId?.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-appDarkBlue/90 to-appDarkBlue w-full text-appLightGray p-1 px-5 rounded-b-xl">
                Total Students : {data?.totalStudents}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-gradient-to-tr from-appDarkBlue/80 to-appDarkBlue p-4 rounded-t-xl text-gray-100">
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <MdBallot size={60} />
                  </div>
                  <div>
                    <p className=" font-bold text-2xl">
                      {data?.questionsId?.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-tr from-gray-100 to-gray-200 border border-appDarkBlue w-full text-appDarkBlue p-1 px-5 rounded-b-xl">
                Total Questions
              </div>
            </div>

            {data?.isPublished && <CalenderCompo date={data?.publishedAt} />}
          </div>
        </div>
        <div className="mt-10">
          {/* QUESTION */}
          <div className="pb-2 border-b border-appDarkBlue flex justify-between items-center">
            <h2 className="font-bold text-2xl text-appDarkBlue ">Questions</h2>
            <div
              className=" rotate-2 bg-appLightGray/40 rounded-full p-1 hover:bg-appLightGray/60 duration-200 mr-4 cursor-pointer"
              onClick={() => setOpenQuestions((prev) => !prev)}
            >
              {openQuestions ? (
                <MdExpandLess size={30} />
              ) : (
                <MdExpandMore size={30} />
              )}
            </div>
          </div>
          {openQuestions && <ViewQuestionComp />}
        </div>

        <div className="mt-5 flex gap-5">
          <button
            className="px-3 py-2 rounded-lg font-semibold text-appDarkBlue hover:bg-appDarkBlue/20 duration-300 flex items-center gap-1"
            onClick={() => handlePrepareQuestion()}
          >
            <MdOutlineQuestionMark size={20} />
            <p>Prepare Questions</p>
          </button>

          <button
            className={`px-3 py-2 ${
              data?.isPublished ? "bg-red-600" : "bg-appGreen"
            } text-white rounded-lg`}
            disabled={changePublishLoading}
            onClick={() => handlePublish()}
          >
            {changePublishLoading ? "Loading..." : buttonContent}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTest;
