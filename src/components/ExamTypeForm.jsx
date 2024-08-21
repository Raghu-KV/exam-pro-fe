import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import {
  useAddExamTypeMutation,
  useUpdateExamTypeMutation,
} from "../redux/requests/examTypeRequest";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ExamTypeForm({ data, isLoading, isFetching }) {
  const formikRef = useRef();
  const navigate = useNavigate();

  const [addExamType, { isLoading: testLa, isError, data: nit }] =
    useAddExamTypeMutation();
  const [updateExamType, updateExamTypeResult] = useUpdateExamTypeMutation();

  useEffect(() => {
    if (data) {
      formikRef?.current?.setFieldValue("examType", data?.examType);
    }
  }, [formikRef, isLoading, isFetching, data]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Toaster />
      <Formik
        innerRef={formikRef}
        initialValues={{
          examType: "",
        }}
        validationSchema={yup.object({
          examType: yup.string().required("Exam Type is required"),
        })}
        onSubmit={async (values) => {
          // if it has data then it is edit or add

          if (data) {
            const editData = { id: data._id, values: values };
            await updateExamType(editData).then((res) => {
              if (res.error) {
                toast.error(res.error.data.message);
              } else {
                toast.success("Updated exam type");
                // navigate("/auth/exam-types");
              }
            });
          } else {
            const addData = { values: values };
            await addExamType(addData.values).then((res) => {
              if (res.error) {
                toast.error(res.error.data.message);
              } else {
                toast.success("Added exam type");
              }
            });
          }
        }}
      >
        <Form className="flex flex-col gap-3 w-2/3">
          <div className="flex flex-col">
            <label htmlFor="examType" className="font-semibold ml-1">
              Exam Type *
            </label>
            <Field
              type="string"
              id="examType"
              name="examType"
              className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
              placeholder="Student name"
            />
            <ErrorMessage name="examType">
              {(errorMessage) => (
                <p className="text-red-500 mr-1">{errorMessage}</p>
              )}
            </ErrorMessage>
          </div>

          <button
            className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ExamTypeForm;
