import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";

function StudentForm() {
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

  // useEffect(() => {
  //   formikRef?.current.setFieldValue("rollNo", "4ssss5");
  // }, [formikRef]);

  //   console.log(formikRef.current);

  if (result.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Formik
        innerRef={formikRef}
        initialValues={{
          rollNo: "",
          studentName: "",
          enrolledExamTypeId: "",
          phoneNo: "",
        }}
        validationSchema={yup.object({
          studentName: yup.string().required("Student Name is required"),
          rollNo: yup.string().required("Roll number is required"),
          enrolledExamTypeId: yup.string().required("Exam Type is required"),
          phoneNo: yup
            .number("Phone No must be a number")
            .min(1)
            .required("Phone number is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col gap-3 w-2/3">
              <div className="flex flex-col">
                <label htmlFor="studentName" className="font-semibold ml-1">
                  Student name *
                </label>
                <Field
                  type="string"
                  id="studentName"
                  name="studentName"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Student name"
                />
                <ErrorMessage name="studentName">
                  {(errorMessage) => (
                    <p className="text-red-500 mr-1">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="rollNo" className="font-semibold ml-1">
                    Roll No *
                  </label>
                  <Field
                    type="string"
                    id="rollNo"
                    name="rollNo"
                    className="border-appGray border px-2 py-3 rounded-xl placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    placeholder="Roll No"
                  />
                  <ErrorMessage name="rollNo">
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
                    name="enrolledExamTypeId"
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
                  <ErrorMessage name="enrolledExamTypeId">
                    {(errorMessage) => (
                      <p className="text-red-500 mr-1">{errorMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="phoneNo" className="font-semibold ml-1">
                    Phone No *
                  </label>
                  <Field
                    type="string"
                    id="phoneNo"
                    name="phoneNo"
                    className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    placeholder="Phone No"
                  />
                  <ErrorMessage name="phoneNo">
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

export default StudentForm;
