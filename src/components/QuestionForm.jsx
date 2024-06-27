import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";

function QuestionForm() {
  const examTypes = [
    { name: "NEET", id: "uhiuwehuio" },
    { name: "JEE", id: "uhiuwehsdfuio" },
  ];

  const chapter = [
    { name: "Algebra", id: "fgbwef" },
    { name: "Trigemontery", id: "scienceID" },
  ];

  const subject = [
    { name: "Maths", id: "fgbwef" },
    { name: "Science", id: "scienceID" },
  ];
  const formikRef = useRef();

  // useEffect(() => {
  //   formikRef?.current.setFieldValue("rollNo", "4ssss5");
  // }, [formikRef]);

  //   console.log(formikRef.current);

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Formik
        innerRef={formikRef}
        initialValues={{
          question: "",
          examType: "",
          subject: "",
          chapter: "",
          options: [
            {
              option1Id: crypto.randomUUID(),
              option1: "",
            },
            {
              option2Id: crypto.randomUUID(),
              option2: "",
            },
            {
              option3Id: crypto.randomUUID(),
              option3: "",
            },
            {
              option4Id: crypto.randomUUID(),
              option4: "",
            },
          ],
        }}
        validationSchema={yup.object({
          question: yup.string().required("Question is required"),
          examType: yup.string().required("Exam Type is required"),
          chapter: yup.string().required("Chapter is required"),
          subject: yup.string().required("Chapter is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          console.log(formik);
          return (
            <Form className="flex flex-col gap-3 w-2/3">
              <div className="flex flex-col">
                <label htmlFor="question" className="font-semibold ml-1">
                  Question *
                </label>
                <Field
                  type="string"
                  id="question"
                  name="question"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Student name"
                />
                <ErrorMessage name="question">
                  {(errorMessage) => (
                    <p className="text-red-500 mr-1">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="chapter" className="font-semibold ml-1">
                    Chapter *
                  </label>
                  <Field
                    as="select"
                    id="chapter"
                    name="chapter"
                    className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    placeholder="Exam type"
                    multiple={false}
                  >
                    <option value="">-Select Chapter-</option>
                    {chapter.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="chapter">
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
                      <option value="">-Select Subject-</option>
                      {subject.map((item) => (
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
                </div>

                <div className="flex w-full gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="examType" className="font-semibold ml-1">
                      Exam Type *
                    </label>
                    <Field
                      as="select"
                      id="examType"
                      name="examType"
                      className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                      placeholder="Exam type"
                      multiple={false}
                    >
                      <option value="">-Select Exam Type-</option>
                      {subject.map((item) => (
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

export default QuestionForm;
