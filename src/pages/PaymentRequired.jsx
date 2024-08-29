import React from "react";

function PaymentRequired() {
  return (
    <div className="flex h-screen w-full justify-center items-center flex-col">
      <div>
        <img src="/aws.png" alt="awsLogo" srcset="" className="w-28" />
      </div>
      <div className="text-center w-[80%] lg:w-[60%]">
        <h1 className="font-semibold mt-4 text-xl">
          Please clear your existing due
        </h1>
        <p className=" text-justify">
          If you encounter any difficulties or require additional assistance, we
          recommend reaching out to your service provider for support Your
          support team will be able to offer detailed instructions and help
          ensure that your problem is addressed promptly and effectively. Do not
          hesitate to contact them for a thorough resolution
        </p>
      </div>
      <a href="https://ap-southeast-2.signin.aws.amazon.com/oauth?client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&code_challenge=FueBFOJfLp-Cn3UknDEo4eupoChPGxBd5NiHHNNUB8I&code_challenge_method=SHA-256&response_type=code&redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26nc2%3Dh_ct%26src%3Dheader-signin%26state%3DhashArgsFromTB_ap-southeast-2_2631b743929b8894">
        <button className="py-1 px-24 font-semibold bg-amber-500 mt-4 hover:bg-amber-600">
          Pay Now
        </button>
      </a>
    </div>
  );
}

export default PaymentRequired;
