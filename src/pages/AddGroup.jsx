import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import GroupForm from "../components/GroupForm";

function AddGroup() {
  return (
    <div className="w-full">
      <PageHeaderComp heading={"Add Group"} />
      <GroupForm />
    </div>
  );
}

export default AddGroup;
