import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen font-inter gap-5">
      <div>COMPANY LOGO</div>
      <div>
        <Formik
          initialValues={{
            phoneNo: "",
            password: "",
          }}
          validationSchema={yup.object({
            phoneNo: yup
              .number("Phone No must be a number")
              .min(1)
              .required("Phone number is required"),
            password: yup.string().required("Password is required"),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className="flex flex-col gap-3">
            <div>
              <Field
                type="number"
                id="phoneNo"
                name="phoneNo"
                className="border-appGray border px-2 py-3 rounded-xl w-96 placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                placeholder="Phone number"
              />
              <ErrorMessage name="phoneNo">
                {(errorMessage) => (
                  <p className="text-red-500 mr-1">{errorMessage}</p>
                )}
              </ErrorMessage>
            </div>

            <div cl>
              <Field
                type="string"
                id="password"
                name="password"
                className="border-appGray border px-2 py-3 rounded-xl w-96 placeholder-slate-400  
                focus:outline-none  focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                placeholder="Password"
              />
              <ErrorMessage name="password">
                {(errorMessage) => (
                  <p className="text-red-500 mr-1">{errorMessage}</p>
                )}
              </ErrorMessage>
            </div>

            <button
              className="w-96 bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
              type="submit"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
