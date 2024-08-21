import LoadingCompo from "../components/LoadingCompo";
import PageHeaderComp from "../components/PageHeaderComp";
import { useGetSingleQuestionQuery } from "../redux/requests/question.request";
import { useParams } from "react-router-dom";

function ViewQuestion() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuestionQuery(id);

  if (isLoading) {
    return <LoadingCompo />;
  }

  return (
    <div className="w-full">
      <PageHeaderComp heading={"View Question"} />

      <div className="px-5 pt-8">
        <div>
          <p className="mb-2">Question:</p>
          <p className="font-bold text-3xl">{data?.question}</p>
        </div>
        <div>
          {data?.options.map((item) => (
            <div className="flex gap-3 mt-2 font-semibold p-1">
              <p
                className={`p-1  rounded-md ${
                  +item.optionId === +data.answerId
                    ? `bg-appGreen text-white`
                    : `bg-slate-200`
                }`}
              >
                {item?.name} :{" "}
              </p>
              <p
                className={`p-1 ${
                  +item.optionId === +data.answerId &&
                  `bg-appGreen text-white rounded-md`
                }`}
              >
                {item?.option}
              </p>
            </div>
          ))}
        </div>

        {data?.explanation && (
          <div className="mt-5">
            <p className="font-bold text-2xl">Explanation:</p>
            <p className="mb-2 pb-2">
              <pre className="font-inter">{data?.explanation}</pre>
            </p>
          </div>
        )}

        <div className="mt-5 pt-4 border-t-2">
          <div className="flex gap-7">
            <div>
              <p className="font-bold">Chapter:</p>
              <p>{data?.chapter?.chapterName}</p>
            </div>

            <div>
              <p className="font-bold">Subject:</p>
              <p>{data?.subject?.subjectName}</p>
            </div>

            <div>
              <p className="font-bold">Exam Type:</p>
              <p>{data?.examType?.examType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;
