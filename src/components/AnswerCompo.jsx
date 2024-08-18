import { useState } from "react";
import { MdCheckCircle, MdCancel, MdArrowDropDown } from "react-icons/md";

function AnswerCompo({ answer }) {
  const [openExp, setOpenExp] = useState(false);
  //   rgb(239 68 68)
  return (
    <div className="border rounded-xl mb-2 py-2 px-2 ">
      <div className="flex justify-end">
        {answer.isCorrect ? (
          <div className="flex justify-center items-center text-xs gap-1 bg-appLightGray/40 py-1 px-2 rounded-full text-white font-semibold bg-green-600">
            <MdCheckCircle size={15} color="white" />
            <p>Correct answer</p>
          </div>
        ) : (
          <div className="flex justify-center items-center text-xs gap-1 bg-appLightGray/40 py-1 px-2 rounded-full text-white font-semibold bg-red-600">
            <MdCancel size={15} color="white" />
            <p>Wrong answer</p>
          </div>
        )}
      </div>

      <div className="text-sm lg:text-base">
        <p className="font-semibold">{answer.question?.question}</p>

        {answer?.question?.options?.map((option) => {
          return (
            <p
              className={`px-2 py-1  rounded-lg mt-1 ${
                answer.answerId === option.optionId && answer.isCorrect
                  ? "bg-green-300"
                  : answer.answerId === option.optionId
                  ? "bg-red-200"
                  : null
              } ${
                answer.question.answerId === option.optionId
                  ? "bg-green-300"
                  : null
              } `}
              key={option.name}
            >
              {option.option}
            </p>
          );
        })}
      </div>

      <div className="mt-3">
        {answer?.question?.explanation && (
          <div
            className="flex justify-start items-center font-semibold px-2 py-1 text-sm bg-appLightGray/40 max-w-max rounded-lg cursor-pointer"
            onClick={() => setOpenExp(!openExp)}
          >
            <p>explanation</p>
            <MdArrowDropDown
              size={25}
              className={`${openExp ? "rotate-180" : "rotate-0 "} duration-200`}
            />
          </div>
        )}

        {openExp && (
          <p className=" text-sm lg:text-base mt-2 border-b border-appLightGray/40">
            <pre className="font-inter"> {answer.question.explanation}</pre>
          </p>
        )}
      </div>

      {/* CHAPTER AND SUBJECT */}
      <div className="flex gap-1 flex-wrap mt-3 lg:gap-10">
        <div className="text-sm ">
          <p>
            <span className="py-1 px-2 bg-appLightGray/40 font-semibold mr-2 inline-block rounded-lg">
              Subject :
            </span>
            {answer?.question?.subject?.subjectName}
          </p>
        </div>

        <div className="text-sm">
          <p>
            <span className="py-1 px-2 bg-appLightGray/40 font-semibold mr-2 inline-block rounded-lg">
              Chapter :
            </span>
            {answer.question?.chapter?.chapterName
              ? answer.question.chapter.chapterName
              : "No chapter"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnswerCompo;
