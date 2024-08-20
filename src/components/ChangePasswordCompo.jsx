import { Field, Form, Formik, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { useChangePasswordMutation } from "../redux/requests/userRequest";
import { useEffect, useRef } from "react";

function ChangePasswordCompo({ setOpenModel }) {
  const modelRef = useRef();

  //   CLICK OUT SIDE TO CLOSE
  useEffect(() => {
    const handler = (event) => {
      if (!modelRef.current.contains(event.target)) {
        setOpenModel(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  return (
    <div
      className="flex flex-col justify-center items-center h-full font-inter gap-5 px-2 lg:px-10 fixed w-full top-0 right-0 
    bg-black/40 z-10"
    >
      <Toaster />

      <div
        className="w-[100%] bg-white p-5 py-16 rounded-xl lg:w-[40%] lg:p-16 relative z-50"
        ref={modelRef}
      >
        <div
          className="absolute top-5 right-5 cursor-pointer hover:bg-appLightGray/40 px-2 font-semibold rounded-full z-50"
          onClick={() => setOpenModel(false)}
        >
          X
        </div>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
          }}
          validationSchema={yup.object({
            oldPassword: yup.string().required("Old passwoed is required"),
            newPassword: yup.string().required("New password is required"),
          })}
          onSubmit={async (values) => {
            try {
              await changePassword(values).unwrap();
              toast.success("Password changed");
            } catch (error) {
              toast.error(error.data.message);
            }
          }}
        >
          <Form className="flex flex-col gap-3 md:justify-center md:items-center">
            <div>
              <Field
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="border-appGray border px-2 py-3 rounded-xl placeholder-slate-400 w-full  focus:outline-none focus:border-appGreen
               focus:ring-1 focus:ring-appGreen md:w-96"
                placeholder="Old password"
              />
              <ErrorMessage name="oldPassword">
                {(errorMessage) => (
                  <p className="text-red-500 mr-1">{errorMessage}</p>
                )}
              </ErrorMessage>
            </div>

            <div>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="border-appGray border px-2 py-3 rounded-xl w-full   placeholder-slate-400  
            focus:outline-none  focus:border-appGreen focus:ring-1 focus:ring-appGreen  md:w-96"
                placeholder="New password"
              />
              <ErrorMessage name="newPassword">
                {(errorMessage) => (
                  <p className="text-red-500 mr-1">{errorMessage}</p>
                )}
              </ErrorMessage>
            </div>

            <button
              className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200 md:w-96"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Change password"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ChangePasswordCompo;
