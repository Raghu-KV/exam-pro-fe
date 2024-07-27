import { useGetSingleTestQuery } from "../redux/requests/testTypesRequest";
import { useParams } from "react-router-dom";
import PageHeaderComp from "../components/PageHeaderComp";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { MdDone } from "react-icons/md";
import TimingCompo from "../components/TimingCompo";

function ViewTest() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTestQuery(id);

  console.log(data, "VIEW TEST");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-[200vh]">
      <PageHeaderComp heading={"View Test"} />
      <div className="px-5 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-2">Test name:</p>
            <p className="font-bold text-3xl">{data?.testName}</p>
          </div>
          <div>
            <p className="mb-2">Test status:</p>
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
        <div className="mt-3">
          <TimingCompo paramId={id} testTiming={data?.testTiming} />
        </div>
      </div>
    </div>
  );
}

export default ViewTest;
