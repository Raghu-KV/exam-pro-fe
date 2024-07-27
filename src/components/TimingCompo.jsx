import { MdOutlineTimer } from "react-icons/md";
import { useState } from "react";
import { useUpdateTimeMutation } from "../redux/requests/testTypesRequest";

function TimingCompo({ testTiming, paramId }) {
  const [updateTime, { isLoading }] = useUpdateTimeMutation();

  function minutesToHours(minutesStr) {
    // if no time
    if (!minutesStr) {
      return "No Time";
    }
    // Convert the string to a number
    const minutes = parseInt(minutesStr, 10);

    // Check if the conversion is valid
    if (isNaN(minutes)) {
      return "Invalid input";
    }

    // Calculate hours and remaining minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Format the output
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
  }

  const timing = minutesToHours(testTiming);

  const [openTiming, setOpenTiming] = useState(false);
  const [time, setTime] = useState(testTiming ? testTiming : 0);

  const handleSaveTime = async () => {
    const prepareData = { id: paramId, values: { testTiming: time } };
    await updateTime(prepareData).then((res) => {
      if (res.error) {
        toast.error("Error");
      } else {
        toast.success("Updated time");
      }
    });
  };

  return (
    <div className="bg-gradient-to-tr from-appGreen/90 to-appGreen p-4 w-1/3 rounded-xl text-white">
      <div className=" flex items-center gap-2  pb-2">
        <div>
          <MdOutlineTimer color="white" size={65} />
        </div>

        <div>
          <p className=" text-xl font-semibold">Test timing</p>
          <p>{timing}</p>
        </div>
      </div>

      <div className="flex pt-2  items-center justify-between border-t border-white/30">
        <p
          className="cursor-pointer hover:scale-105 duration-200 p-2"
          onClick={() => setOpenTiming((prev) => !prev)}
        >
          Edit timing {"->"}
        </p>

        {openTiming && (
          <div>
            <span className="mr-1 p-1">Enter time in minuts</span>
            <input
              type="number"
              className="w-20 py-1 px-3 text-black rounded-lg focus:outline-none"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <button
              className="ml-2 border py-1 px-2 rounded-lg cursor-pointer hover:scale-105 duration-200  inline-block"
              onClick={() => handleSaveTime()}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimingCompo;
