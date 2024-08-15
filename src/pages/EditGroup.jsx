import PageHeaderComp from "../components/PageHeaderComp";
import GroupForm from "../components/GroupForm";
import { useGetGroupByIdQuery } from "../redux/requests/groupRequest";
import { useParams } from "react-router-dom";

function EditGroup() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useGetGroupByIdQuery(id);

  return (
    <div className="w-full">
      <PageHeaderComp heading={"Edit Exam Type"} />
      <GroupForm data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default EditGroup;
