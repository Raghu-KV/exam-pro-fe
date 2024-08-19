import React from "react";

function PaymentRequired() {
  return (
    <div className="flex h-screen w-full justify-center items-center flex-col">
      <div>
        <img src="/aws.png" alt="awsLogo" srcset="" className="w-28" />
      </div>
      <div className="text-center w-[60%]">
        <h1 className="font-semibold mt-4 text-xl">
          Please clear your existing due
        </h1>
        <p>
          If you encounter any difficulties or require additional assistance, we
          recommend reaching out to your service provider for support Your
          support team will be able to offer detailed instructions and help
          ensure that your problem is addressed promptly and effectively. Do not
          hesitate to contact them for a thorough resolution
        </p>
      </div>
    </div>
  );
}

export default PaymentRequired;
