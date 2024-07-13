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
  //   formikRef?.current.setFieldValue("options", [
  //     {
  //       optionId: 10,
  //       option: "10",
  //       name: "option A",
  //     },
  //     {
  //       optionId: crypto.randomUUID(),
  //       option: "",
  //       name: "option B",
  //     },
  //     {
  //       optionId: crypto.randomUUID(),
  //       option: "",
  //       name: "option C",
  //     },
  //     {
  //       optionId: crypto.randomUUID(),
  //       option: "",
  //       name: "option D",
  //     },
  //   ]);
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
              optionId: crypto.randomUUID(),
              option: "",
              name: "option A",
            },
            {
              optionId: crypto.randomUUID(),
              option: "",
              name: "option B",
            },
            {
              optionId: crypto.randomUUID(),
              option: "",
              name: "option C",
            },
            {
              optionId: crypto.randomUUID(),
              option: "",
              name: "option D",
            },
          ],
          answer: "",
        }}
        validationSchema={yup.object({
          question: yup.string().required("Question is required"),
          examType: yup.string().required("Exam Type is required"),
          chapter: yup.string().required("Chapter is required"),
          subject: yup.string().required("Subject is required"),
          options: yup.array().of(
            yup.object().shape({
              optionId: yup.string().required(),
              option: yup.string().required("Every 4 options are required"),
              name: yup.string().required(),
            })
          ),
          answer: yup.string().required("Answer is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          console.log(formik);

          const optionsValues = formik.values.options.filter(
            (item) => item.option
          );

          console.log(optionsValues);
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
                  <label htmlFor="option1" className="font-semibold ml-1">
                    Option A *
                  </label>
                  <Field
                    type="string"
                    id="option1"
                    name="options[0].option"
                    className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    placeholder="Option 1"
                  />
                  <ErrorMessage name="options[0].option">
                    {(errorMessage) => (
                      <p className="text-red-500 mr-1">{errorMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex w-full gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="option2" className="font-semibold ml-1">
                      Option B *
                    </label>
                    <Field
                      type="string"
                      id="option2"
                      name="options[1].option"
                      className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                      placeholder="Option 2"
                    />
                    <ErrorMessage name="options[1].option">
                      {(errorMessage) => (
                        <p className="text-red-500 mr-1">{errorMessage}</p>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>

              {/* OPTION FIELDS  */}
              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="option3" className="font-semibold ml-1">
                    Option C *
                  </label>
                  <Field
                    type="string"
                    id="option3"
                    name="options[2].option"
                    className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    placeholder="Option 3"
                  />
                  <ErrorMessage name="options[2].option">
                    {(errorMessage) => (
                      <p className="text-red-500 mr-1">{errorMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex w-full gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="option4" className="font-semibold ml-1">
                      Option D *
                    </label>
                    <Field
                      type="string"
                      id="option4"
                      name="options[3].option"
                      className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                      placeholder="Option 4"
                    />
                    <ErrorMessage name="options[3].option">
                      {(errorMessage) => (
                        <p className="text-red-500 mr-1">{errorMessage}</p>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>

              <div
                className={`flex flex-col w-full ${
                  optionsValues.length >= 4 ? null : `opacity-45`
                } `}
              >
                <label htmlFor="answer" className="font-semibold ml-1">
                  Answer *
                </label>
                <Field
                  as="select"
                  id="answer"
                  name="answer"
                  className={`border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen`}
                  placeholder="Exam type"
                  multiple={false}
                  disabled={optionsValues.length >= 4 ? false : true}
                >
                  <option value="">-Select Answer-</option>
                  {optionsValues.map((item) => (
                    <option value={item.optionId} key={item.optionId}>
                      {item.name}
                      {" --> "}
                      {item.option}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="answer">
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
