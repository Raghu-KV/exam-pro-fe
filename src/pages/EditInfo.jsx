import PageHeaderComp from "./../components/PageHeaderComp";
import InfoForm from "../components/InfoForm";
import { useParams } from "react-router-dom";
import { useGetSingleInfoQuery } from "../redux/requests/infoCenterRequest";

function EditInfo() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useGetSingleInfoQuery(id);
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Info"} />
      <InfoForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditInfo;
