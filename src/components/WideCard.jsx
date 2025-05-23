import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

function WideCard({
  data,
  btnContent,
  btnClassName,
  btnIcon,
  onClick,
  btnDisabled,
}) {
  const [openQuestions, setOpenQuestions] = useState(false);

  return (
    <div className="w-full px-1 py-2 border border-appDarkBlue rounded-xl">
      <div className={`flex items-start justify-between gap-3`}>
        <div className="flex flex-col">
          {openQuestions ? (
            <p className="px-2">
              <pre className="font-inter whitespace-pre-wrap break-words text-justify">
                {data.question}
              </pre>
            </p>
          ) : (
            <p className="px-2">
              <pre className="font-inter whitespace-pre-wrap break-words text-justify">
                {data.question.length > 100
                  ? data.question.slice(0, 100) + "..."
                  : data.question}
              </pre>
            </p>
          )}

          {/* IMAGE */}

          {data?.imageFullUrl && openQuestions && (
            <div className=" m-3 w-[50%] aspect-video">
              <img
                src={data?.imageFullUrl}
                alt="question-image"
                className="aspect-video object-cover  rounded-2xl border border-appLightGray"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div>
            <button
              className={btnClassName}
              onClick={() => onClick(data.questionId)}
              disabled={btnDisabled}
            >
              {btnIcon}
              <p>{btnContent}</p>
            </button>
          </div>
          <div
            className=" rotate-2 rounded-full hover:bg-appLightGray/60 duration-200 mr-4 cursor-pointer"
            onClick={() => setOpenQuestions((prev) => !prev)}
          >
            {openQuestions ? (
              <MdExpandLess size={30} />
            ) : (
              <MdExpandMore size={30} />
            )}
          </div>
        </div>
      </div>
      {openQuestions && (
        <div className="border-t border-appGray px-2 py-1">
          <p className="p-1">Ans : {data?.options[data?.answerId]?.option}</p>
          <div className="flex flex-wrap divide-x divide-appDarkBlue">
            <p className="px-2"> Chapter : {data?.chapter.chapterName}</p>
            <p className="px-2"> Subject : {data?.subject.subjectName}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WideCard;
