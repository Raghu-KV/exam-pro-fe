import PageHeaderComp from "../components/PageHeaderComp";
import { useGetSingleInfoQuery } from "../redux/requests/infoCenterRequest";
import { useParams } from "react-router-dom";

import moment from "moment";
import LoadingCompo from "../components/LoadingCompo";

function ViewInfo() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useGetSingleInfoQuery(id);

  if (isLoading) {
    return <LoadingCompo />;
  }

  return (
    <div className="w-full">
      <PageHeaderComp heading={"View Info"} />

      <div className="px-4">
        <h2 className="font-semibold text-appGray">Title</h2>
        <p className="text-3xl font-bold">{data?.infoTitle}</p>
      </div>

      <div className="px-4 mt-5">
        <h2 className="font-semibold text-appGray text-xl">Description</h2>
        <p className=" text-lg font-inter">
          <pre className="font-inter whitespace-pre-wrap break-words text-justify">
            {data?.description}
          </pre>
        </p>
      </div>

      <div className="px-4 mt-5">
        <h2 className="font-semibold text-appGray text-xl">Exam type</h2>
        <p className="font-semibold">{data?.examType.examType}</p>
      </div>

      <div className="px-4 mt-5">
        <h2 className="font-semibold text-appGray text-xl">Created at</h2>
        <p className="font-semibold">
          {moment(data?.createdAt).format("L")} |{" "}
          {moment(data?.createdAt).calendar()}
        </p>
      </div>
    </div>
  );
}

export default ViewInfo;
