import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";

import { useLazyGetAllSubjectsForDropDownQuery } from "../redux/requests/subjectsRequest";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";
import { useLazyGetAllChapterForDropDownQuery } from "../redux/requests/chapterRequest";
import {
  useAddQuestionMutation,
  useEditQuestionMutation,
  useGetCloudinarySignMutation,
} from "../redux/requests/question.request";
import { MdImage, MdOutlineFileUpload, MdDeleteOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

function QuestionForm({ data, isLoading, isFetching }) {
  const [imageShortUrl, setImageShortUrl] = useState("");
  const [imageFullUrl, setImageFullUrl] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  // IMAGE UPLOAD
  const [uploadSiganature, { isLoading: uploadSiganatureLoading }] =
    useGetCloudinarySignMutation();

  const handleImageUpload = async (event) => {
    try {
      setUploadLoading(true);
      // Get the file from the input
      const file = event.target.files[0];
      if (!file) {
        throw new Error("No file selected.");
      }

      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5 MB in bytes

      if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `File size exceeds the ${MAX_FILE_SIZE / (1024 * 1024)} MB limit.`
        );
      }
      // Fetch the Cloudinary signature
      const cloudinarySignature = await uploadSiganature().unwrap();
      const { signature, timestamp } = cloudinarySignature;
      const api_key = "274612461493119"; // This should be secured and not hardcoded in production.

      // Cloudinary upload URL
      const cloudName = "dkhns2yiy";
      const resourceType = "image";
      const postImageCloudinaryApi = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      // Prepare the FormData object
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", api_key);
      formData.append("folder", "question-images");

      // Send the request
      const response = await fetch(postImageCloudinaryApi, {
        method: "POST",
        body: formData,
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      // Parse and handle the response
      const data = await response.json();

      setImageFullUrl(data?.secure_url);
      setImageShortUrl(data?.public_id);
      setUploadLoading(false);

      // Optionally handle the uploaded data
      // e.g., update state or show a success message
    } catch (error) {
      // Display error message to the user
      console.error("Error during file upload:", error.message);
      setUploadLoading(false);
      toast.error(error.message);
    }
  };

  const handleDeleteInage = () => {
    setImageFullUrl("");
    setUploadLoading("");
  };

  // EXAM TYPE DROP DOWN
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

  // SUBJECT DROPDOWN API
  const [subjectTrigger, subjectResult] =
    useLazyGetAllSubjectsForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await subjectTrigger();
    };
    fetch();
  }, []);

  const subject = subjectResult?.data?.map((item) => {
    return { id: item.subjectId, name: item.subjectName };
  });

  const [chapterTrigger, chapterResult] =
    useLazyGetAllChapterForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await chapterTrigger();
    };
    fetch();
  }, []);

  const chapter = chapterResult?.data?.map((item) => {
    return { id: item.chapterId, name: item.chapterName };
  });

  const formikRef = useRef();

  // PREFILL VALUES
  useEffect(() => {
    if (data) {
      formikRef?.current?.setFieldValue("question", data?.question);
      formikRef?.current?.setFieldValue("examTypeId", data?.examTypeId);
      formikRef?.current?.setFieldValue("subjectId", data?.subjectId);
      formikRef?.current?.setFieldValue("chapterId", data?.chapterId);
      formikRef?.current?.setFieldValue("options", data?.options);
      formikRef?.current?.setFieldValue("answerId", data?.answerId);
      formikRef?.current?.setFieldValue("explanation", data?.explanation);
      // PRE-LOAD-IMAGE
      setImageFullUrl(data?.imageFullUrl);
      setImageShortUrl(data?.imageShortUrl);
    }
  }, [formikRef, data, isLoading, isFetching]);

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

  const [addQuestion, { isLoading: addQuestionLoading }] =
    useAddQuestionMutation();
  const [editQuestion, { isLoading: editQuestionLoading }] =
    useEditQuestionMutation();

  if (
    result.isLoading ||
    isLoading ||
    subjectResult.isLoading ||
    chapterResult.isLoading
  ) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Toaster />
      <Formik
        innerRef={formikRef}
        initialValues={{
          question: "",
          examTypeId: "",
          subjectId: "",
          chapterId: "",
          options: [
            {
              optionId: 0,
              option: "",
              name: "option A",
            },
            {
              optionId: 1,
              option: "",
              name: "option B",
            },
            {
              optionId: 2,
              option: "",
              name: "option C",
            },
            {
              optionId: 3,
              option: "",
              name: "option D",
            },
          ],
          answerId: "",
          explanation: "",
        }}
        validationSchema={yup.object({
          question: yup.string().required("Question is required"),
          examTypeId: yup.string().required("Exam Type is required"),
          chapterId: yup.string().required("Chapter is required"),
          subjectId: yup.string().required("Subject is required"),
          options: yup.array().of(
            yup.object().shape({
              optionId: yup.number().required(),
              option: yup.string().required("Every 4 options are required"),
              name: yup.string().required(),
            })
          ),
          answerId: yup.string().required("Answer is required"),
          explanation: yup.string(),
        })}
        onSubmit={async (values) => {
          if (data) {
            const editData = {
              id: data._id,
              values: { ...values, imageFullUrl, imageShortUrl },
            };
            await editQuestion(editData).then((res) => {
              if (res.error) {
                toast.error(res.error.data.message);
              } else {
                toast.success("Updated exam type");
                // navigate("/auth/exam-types");
              }
            });
          } else {
            const addData = { ...values, imageFullUrl, imageShortUrl };
            await addQuestion(addData).then((res) => {
              if (res.error) {
                toast.error(res.error.data.message);
              } else {
                toast.success("Added question");
              }
            });
          }
        }}
      >
        {(formik) => {
          const optionsValues = formik?.values?.options?.filter(
            (item) => item?.option
          );
          return (
            <Form className="flex flex-col gap-3 w-4/5 mb-8">
              <div className="flex flex-col">
                <label htmlFor="question" className="font-semibold ml-1">
                  Question *
                </label>
                <textarea
                  {...formik.getFieldProps("question")}
                  type="string"
                  id="question"
                  name="question"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Question"
                />
                <ErrorMessage name="question">
                  {(errorMessage) => (
                    <p className="text-red-500 mr-1">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex flex-col">
                <label htmlFor="file-input" className="font-semibold ml-1">
                  <div className="flex justify-start items-center gap-1">
                    <MdImage size={20} />
                    <p>Image</p>
                  </div>
                </label>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  disabled={uploadLoading}
                  onChange={(event) => handleImageUpload(event)}
                />
                <label
                  htmlFor="file-input"
                  className=" border rpunded-xl border-appGray py-3 rounded-xl cursor-pointer px-2 hover:bg-appGray/20 duration-200"
                >
                  {uploadLoading ? (
                    <div className="flex justify-start items-center gap-1 text-appGray">
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <div className="flex justify-start items-center gap-1 text-appGray">
                      <MdOutlineFileUpload size={20} />
                      <p>Select Image</p>
                    </div>
                  )}
                </label>

                {imageFullUrl && (
                  <div className="relative mt-3 w-[55%] ">
                    <div
                      className="bg-appGray p-1 absolute top-3 right-3 rounded-full cursor-pointer text-white hover:scale-105 hover:bg-red-500 duration-200"
                      onClick={() => handleDeleteInage()}
                    >
                      <MdDeleteOutline size={25} />
                    </div>
                    <img
                      src={imageFullUrl}
                      alt="question-image"
                      className=" aspect-video object-cover  rounded-2xl border border-appLightGray"
                    />
                  </div>
                )}
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
                    className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen
                     focus:ring-1 focus:ring-appGreen"
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
                  optionsValues?.length >= 4 ? null : `opacity-45`
                } `}
              >
                <label htmlFor="answer" className="font-semibold ml-1">
                  Answer *
                </label>
                <Field
                  as="select"
                  id="answer"
                  name="answerId"
                  className={`border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen`}
                  placeholder="Exam type"
                  multiple={false}
                  disabled={optionsValues?.length >= 4 ? false : true}
                >
                  <option value="">-Select Answer-</option>
                  {optionsValues?.map((item) => (
                    <option value={item.optionId} key={item.optionId}>
                      {item?.name}
                      {" --> "}
                      {item?.option}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="answerId">
                  {(errorMessage) => (
                    <p className="text-red-500 mr-1">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>

              <div className={`flex flex-col w-full`}>
                <label htmlFor="explanation" className="font-semibold ml-1">
                  Explanation
                </label>
                <textarea
                  id="explanation"
                  {...formik.getFieldProps("explanation")}
                  name="explanation"
                  className={`border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen`}
                  placeholder="Write your explanation... "
                />

                <ErrorMessage name="explanation">
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
                    name="chapterId"
                    className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                    placeholder="Exam type"
                    multiple={false}
                  >
                    <option value="">-Select Chapter-</option>
                    {chapter?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="chapterId">
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
                      name="subjectId"
                      className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                      placeholder="Exam type"
                      multiple={false}
                    >
                      <option value="">-Select Subject-</option>
                      {subject?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="subjectId">
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
                      name="examTypeId"
                      className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                      placeholder="Exam type"
                      multiple={false}
                    >
                      <option value="">-Select Exam Type-</option>
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
                </div>
              </div>

              <button
                className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
                type="submit"
                disabled={addQuestionLoading || editQuestionLoading}
              >
                {addQuestionLoading || editQuestionLoading
                  ? "Loading..."
                  : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default QuestionForm;
