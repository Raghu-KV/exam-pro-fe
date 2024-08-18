import {
  MdOutlineDateRange,
  MdOutlineGrading,
  MdOutlineCallMade,
  MdOutlineSchedule,
  MdOutlineAutoGraph,
  MdOutlineMargin,
} from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function SingleCard({ data, isButton }) {
  const location = useLocation();
  const currentLoactaion = location.pathname.split("/")[2];

  const navigate = useNavigate();

  return (
    <div className="border border-appLightGray/50 rounded-xl px-4 py-4 hover:border-appGreen duration-200">
      <h2 className="font-semibold text-xl">{data.testName}</h2>

      <div className="flex items-center text-sm text-appGray mt-2 gap-7">
        <div className=" flex items-center gap-1">
          <MdOutlineDateRange size={20} />
          <p>{moment(data.publishedAt).format("DD/MM/YYYY")}</p>
        </div>

        <div className=" flex items-center gap-1">
          <MdOutlineSchedule size={20} />
          <p>{data.testTiming ? `${data.testTiming} Mins` : "No timing"} </p>
        </div>

        {/* {["info-center"].includes(currentLoactaion) && (
            <div className=" flex items-center gap-1">
              <MdOutlineMargin size={20} />
              <p>{data.examType.examType} </p>
            </div>
          )} */}
      </div>
      {isButton && (
        <button
          className="flex items-center px-3 py-2 bg-appGreen text-white rounded-full text-sm font-semibold mt-4 gap-2 hover:bg-appGreen/90"
          onClick={() => navigate(`insight/${data._id}`)}
        >
          <p>View insights</p>
          <MdOutlineAutoGraph size={20} />
        </button>
      )}
    </div>
  );
}

export default SingleCard;
