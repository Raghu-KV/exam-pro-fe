import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";

function Subjects() {
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Subjects"}
        buttonContent={"Add subject"}
        route={"/auth/subjects/add-subject"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Subjects;
