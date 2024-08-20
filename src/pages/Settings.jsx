import React from "react";
import PageHeaderComp from "../components/PageHeaderComp";
import {
  useGetPaymentDeatilsQuery,
  useChangePasswordMutation,
} from "../redux/requests/userRequest";
import ChangePasswordCompo from "../components/ChangePasswordCompo";

import { useState } from "react";

function Settings() {
  const [openModel, setOpenModel] = useState(false);
  const { data, isLoading, isError, error } = useGetPaymentDeatilsQuery();

  return (
    <div className="w-full">
      <PageHeaderComp heading={"Settings"} />
      <div className="flex items-start justify-center gap-4 flex-wrap px-4">
        <div className=" basis-2/5">
          <div className="border border-appLightGray/40 px-4 py-8 rounded-lg">
            <div>
              <img src="/aws.png" alt="aws" srcSet="" className="w-20" />
            </div>
            {data?.isDue ? (
              <div className="font-semibold mt-5 text-appGray">
                <p className=" text-red-600 text-2xl"> Amount Due!!</p>
                <p className="text-slate-600">Bill data : {data?.dueDate} </p>
                <p className="text-slate-600">
                  Amount Payable : Rs.{data?.dueAmount}
                </p>

                <p className="mt-3 font-normal">
                  To avoid any potential suspension of your account, please
                  ensure that the outstanding amount is settled within the next
                  five business days. We kindly recommend reviewing the details
                  of the payment due, contacting our customer service team if
                  you have any questions or need assistance, and arranging for
                  prompt payment or a payment plan if necessary. If you need any
                  help or further clarification, please do not hesitate to reach
                  out. We appreciate your attention to this matter and your
                  prompt action.
                </p>
              </div>
            ) : (
              <div className="font-semibold mt-5">
                <p className=" text-green-600 text-2xl"> No Amount Due!!</p>
                <p className="text-appGray">
                  Next bill data : {data?.dueDate}{" "}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className=" basis-2/5">
          {openModel && <ChangePasswordCompo setOpenModel={setOpenModel} />}
          <div
            className="border border-appLightGray/40 px-4 py-4 rounded-lg font-semibold cursor-pointer hover:bg-black/10 duration-200"
            onClick={() => setOpenModel(true)}
          >
            Change password
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
