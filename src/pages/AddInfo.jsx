import PageHeaderComp from "./../components/PageHeaderComp";
import InfoForm from "../components/InfoForm";

function AddInfo() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Info"} />
      <InfoForm />
    </div>
  );
}

export default AddInfo;
