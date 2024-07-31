import PageHeaderComp from "../components/PageHeaderComp";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WideCard from "../components/WideCard";
import { MdOutlineRemove } from "react-icons/md";
import { removeQuestion } from "../redux/reducers/prepareQuestion-reducer";
import { useEffect } from "react";
import { getAllQuestionsThunk } from "../redux/reducers/prepareQuestion-reducer";
import SelectQuestions from "../components/SelectQuestions";
import { useUpdateQuestionsMutation } from "../redux/requests/testTypesRequest";
import { useBlocker } from "react-router-dom";

function PrepareQuestions() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openQuestion, setOpenQuestion] = useState(false);
  const [changed, setChanged] = useState(false);

  const [updateQuestions, { isLoading: updateQuestionsIsLoading }] =
    useUpdateQuestionsMutation();

  useEffect(() => {
    dispatch(getAllQuestionsThunk(id));
  }, [dispatch]);

  useEffect(() => {
    if (changed) {
      function handleBeforeUnload(event) {
        event.preventDefault();
        return (event.returnValue = "");
      }
      window.addEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload, {
          capture: true,
        });
      };
    }
  }, [changed]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      changed && currentLocation.pathname !== nextLocation.pathname
  );

  const allQuestions = useSelector((state) => state.prepareQuestions.value);
  const isLoading = useSelector((state) => state.prepareQuestions.isLoading);

  const handleRemoveQuestion = (id) => {
    setChanged(true);
    dispatch(removeQuestion(id));
    toast.success("Successfully removed question");
  };

  const handleUpdateQuestions = async () => {
    setChanged(false);
    const onlyIds = allQuestions.map((item) => item.questionId);
    const prepare = { id: id, questionsId: onlyIds };
    await updateQuestions(prepare).then((res) => {
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("successfully updated");
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (blocker.state === "blocked") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="bg-gray-200 px-10 py-5 rounded-xl w-1/2 mb-16">
          <p className="text-3xl font-bold text-appDarkBlue">
            The question prepared will not be saved ?
          </p>
          <p className="text-appDarkBlue mt-3">
            When changing page the selected or removed questions will not be
            saved, please save the changes before navigating to other page
          </p>
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => blocker.proceed()}
              className="block border border-appGreen px-4 py-2 rounded-lg text-appGreen text-sm hover:scale-105 duration-200"
            >
              Proceed
            </button>
            <button
              onClick={() => blocker.reset()}
              className="block bg-appGreen px-4 py-2 text-sm text-white rounded-lg hover:scale-105 duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Toaster />

      <PageHeaderComp heading={"Prepare questions"} />

      {openQuestion ? (
        <div
          className="fixed right-0 top-25 px-4 py-2 border border-appDarkBlue rounded-l-lg cursor-pointer  
        hover:bg-red-400 duration-300 z-50 bg-white"
          onClick={() => setOpenQuestion(false)}
        >
          {"X"}
        </div>
      ) : (
        <div
          className="fixed right-0 top-25 px-4 py-2 border border-appDarkBlue rounded-l-lg cursor-pointer w-[8%] 
        hover:bg-gray-300 hover:w-[9%] duration-300 z-50 bg-white"
          onClick={() => setOpenQuestion(true)}
        >
          {"<--"} Questions
        </div>
      )}

      <div className="flex w-full p-4 mt-1">
        {/* FIRST HALF */}
        <div className="flex-1 pr-3 relatives">
          <div className="bg-slate-200 rounded-2xl sticky top-[90px] z-40 p-3 mb-3">
            Total Questions Selected :{" "}
            <span className="font-bold">{allQuestions?.length}</span>
          </div>
          {allQuestions.length ? (
            <>
              <div className="flex flex-col gap-2">
                {allQuestions.map((item) => (
                  <WideCard
                    key={item._id}
                    data={item}
                    btnContent={"Remove"}
                    btnIcon={<MdOutlineRemove size={25} />}
                    btnClassName={
                      "flex bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-1 rounded-lg items-center"
                    }
                    onClick={(id) => handleRemoveQuestion(id)}
                  />
                ))}
              </div>

              <div className="mt-2">
                <button
                  className={`p-2 bg-appGreen text-white font-semibold rounded-lg hover:scale-105 duration-200`}
                  disabled={updateQuestionsIsLoading}
                  onClick={handleUpdateQuestions}
                >
                  {updateQuestionsIsLoading ? "Loading..." : "Update questions"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              No questions selected
            </div>
          )}
        </div>

        {/* SECOND HALF */}
        {openQuestion && (
          <div className="flex-1 border-l border-appDarkBlue h-[80vh] sticky top-[115px] bg-white overflow-y-scroll pb-8">
            <SelectQuestions setChanged={setChanged} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PrepareQuestions;
