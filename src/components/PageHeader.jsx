import React from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function PageHeader({ heading, buttonContent, route }) {
  const navigate = useNavigate();

  return (
    <div className="bg-appLightGray/30 rounded-2xl m-2 sticky top-2">
      <div className="py-3 px-8 flex items-center justify-between font-inter w-full">
        <div>
          <h1 className=" font-bold text-3xl text-appDarkBlue py-2">
            {heading}
          </h1>
        </div>
        <div>
          {route && buttonContent && (
            <div
              className="bg-appGreen py-2 rounded-lg px-4 text-white font-medium text-sm flex items-center justify-center gap-2 hover:scale-105 
          duration-150 cursor-pointer"
              onClick={() => navigate(route)}
            >
              <MdAdd size={25} />
              <p>{buttonContent}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
