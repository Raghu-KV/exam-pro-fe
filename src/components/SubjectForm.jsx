import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";

function SubjectForm() {
  const examTypes = [
    { name: "NEET", id: "uhiuwehuio" },
    { name: "JEE", id: "uhiuwehsdfuio" },
  ];

  const formikRef = useRef();

  //   useEffect(() => {
  //     formikRef?.current.setFieldValue("rollNo", "45");
  //   }, [formikRef]);

  //   console.log(formikRef.current);

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Formik
        innerRef={formikRef}
        initialValues={{
          subjectName: "",
          examType: "",
        }}
        validationSchema={yup.object({
          subjectName: yup.string().required("Subject Name is required"),

          examType: yup.string().required("Exam Type is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
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
              name="examType"
              className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
              placeholder="Exam type"
              multiple={false}
            >
              <option value="">-Select exam type-</option>
              {examTypes.map((item) => (
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

export default SubjectForm;
