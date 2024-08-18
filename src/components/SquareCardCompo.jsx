import React, { memo } from "react";
const SquareCardCompo = memo(({ icon, name, number }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 font-inter border border-appLightGray p-3 rounded-xl text-appDarkBlue">
      <div>
        <h2 className="font-bold text-2xl">{number}</h2>
      </div>
      <div className="flex justify-center items-center text-appGreen gap-1">
        <div className="FORICON">{icon}</div>
        <p className="font-semibold">{name}</p>
      </div>
    </div>
  );
});

export default SquareCardCompo;
