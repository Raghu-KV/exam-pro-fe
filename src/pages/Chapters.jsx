import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
function Chapters() {
  return (
    <div className="w-full">
      <PageHeaderComp
        heading={"Chapters"}
        buttonContent={"Add chapter"}
        route={"/auth/chapters/add-chapter"}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default Chapters;
