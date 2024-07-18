import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";

import {
  usePostSubjectMutation,
  useUpdateSubjectMutation,
} from "../redux/requests/subjectsRequest";
import toast, { Toaster } from "react-hot-toast";

function SubjectForm({ data, isLoading, isFetching }) {
  const [trigger, result] = useLazyGetExamTypeForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await trigger();
    };
    fetch();
  }, []);

  const examTypes = result?.data?.map((examType) => {
    return { name: examType.examType, id: examType.examTypeId };
  });

  const formikRef = useRef();

  const [postSubject, { isLoading: postSubjectLoading }] =
    usePostSubjectMutation();
  const [updateSubject, { isLoading: updateSubjectLoading }] =
    useUpdateSubjectMutation();

  useEffect(() => {
    formikRef?.current?.setFieldValue("subjectName", data?.subjectName);
    formikRef?.current?.setFieldValue("examTypeId", data?.examTypeId);
  }, [formikRef, data, isLoading, isFetching]);

  //   console.log(formikRef.current);

  if (result.isLoading || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Toaster />
      <Formik
        innerRef={formikRef}
        initialValues={{
          subjectName: "",
          examTypeId: "",
        }}
        validationSchema={yup.object({
          subjectName: yup.string().required("Subject Name is required"),

          examTypeId: yup.string().required("Exam Type is required"),
        })}
        onSubmit={async (values) => {
          console.log(values);
          if (data) {
            const editData = { id: data._id, values: values };
            await updateSubject(editData).then((res) => {
              if (res.error) {
                toast.error("Error");
              } else {
                toast.success("Updated exam type");
                // navigate("/auth/exam-types");
              }
            });
          } else {
            const addData = { values: values };
            await postSubject(addData.values).then((res) => {
              if (res.error) {
                toast.error("Error");
              } else {
                toast.success("Added exam type");
              }
            });
          }
        }}
      >
        <Form className="flex flex-col gap-3 w-2/3">
          <div className="flex flex-col">
            <label htmlFor="subjectName" className="font-semibold ml-1">
              Subject name *
            </label>
            <Field
              type="string"
              id="subjectName"
              name="subjectName"
              className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
              placeholder="Subject name"
            />
            <ErrorMessage name="subjectName">
              {(errorMessage) => (
                <p className="text-red-500 mr-1">{errorMessage}</p>
              )}
            </ErrorMessage>
          </div>

          <div className="flex flex-col">
            <label htmlFor="examType" className="font-semibold ml-1">
              Exam type *
            </label>
            <Field
              as="select"
              id="examType"
              name="examTypeId"
              className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
              placeholder="Exam type"
              multiple={false}
            >
              <option value="">-Select exam type-</option>
              {examTypes?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="examTypeId">
              {(errorMessage) => (
                <p className="text-red-500 mr-1">{errorMessage}</p>
              )}
            </ErrorMessage>
          </div>

          <button
            className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
            type="submit"
            disabled={postSubjectLoading || updateSubjectLoading}
          >
            {postSubjectLoading || updateSubjectLoading
              ? "Loading..."
              : "Submit"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SubjectForm;
