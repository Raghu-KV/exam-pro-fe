import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useLazyGetAllSubjectsForDropDownQuery } from "../redux/requests/subjectsRequest";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";
function ChapterForm() {
  const [trigger, result] = useLazyGetExamTypeForDropDownQuery();
  const formikRef = useRef();

  useEffect(() => {
    const fetch = async () => {
      await trigger();
    };
    fetch();
  }, []);

  const examTypes = result?.data?.map((examType) => {
    return { name: examType.examType, id: examType.examTypeId };
  });

  // SUBJECT DROPDOWN API
  const [subjectTrigger, subjectResult] =
    useLazyGetAllSubjectsForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await subjectTrigger();
    };
    fetch();
  }, []);

  const prpareSubjectDropDown = subjectResult?.data?.map((item) => {
    return { id: item.subjectId, name: item.subjectName };
  });

  const subjectTypes = prpareSubjectDropDown;

  useEffect(() => {
    // formikRef?.current.setFieldValue("rollNo", "45");
  }, [formikRef, formikRef?.current?.values]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Formik
        innerRef={formikRef}
        initialValues={{
          chapterName: "",
          subject: "",
          examType: "",
        }}
        validationSchema={yup.object({
          chapterName: yup.string().required("Chapter Name is required"),
          subject: yup.string().required("Subject is required"),
          examType: yup.string().required("Exam Type is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col gap-3 w-2/3">
              <div className="flex flex-col">
                <label htmlFor="chapterName" className="font-semibold ml-1">
                  Chapter name *
                </label>
                <Field
                  type="string"
                  id="chapterName"
                  name="chapterName"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Student name"
                />
                <ErrorMessage name="chapterName">
                  {(errorMessage) => (
                    <p className="text-red-500 mr-1">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="subject" className="font-semibold ml-1">
                    Subject *
                  </label>
                  <Field
                    as="select"
                    id="subject"
                    name="subject"
                    className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    placeholder="Exam type"
                    multiple={false}
                  >
                    <option value="">-Select subject-</option>
                    {subjectTypes?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="subject">
                    {(errorMessage) => (
                      <p className="text-red-500 mr-1">{errorMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="examType" className="font-semibold ml-1">
                    Exam type *
                  </label>
                  <Field
                    as="select"
                    id="examType"
                    name="examType"
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
                  <ErrorMessage name="examType">
                    {(errorMessage) => (
                      <p className="text-red-500 mr-1">{errorMessage}</p>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <button
                className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
                type="submit"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ChapterForm;
