import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";
import toast, { Toaster } from "react-hot-toast";
import {
  usePostInfoMutation,
  useUpdateInfoMutation,
} from "../redux/requests/infoCenterRequest";

function InfoForm({ data, isLoading, isFetching }) {
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

  const [postInfo, { isLoading: postInfoLoading }] = usePostInfoMutation();
  const [updateInfo, { isLoading: updateInfoLoading }] =
    useUpdateInfoMutation();

  useEffect(() => {
    if (data) {
      formikRef?.current?.setFieldValue("infoTitle", data?.infoTitle);
      formikRef?.current?.setFieldValue("description", data?.description);
      formikRef?.current?.setFieldValue("examTypeId", data?.examTypeId);
    }
  }, [formikRef, data, isLoading, isFetching]);

  if (result.isLoading || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Toaster />
      <Formik
        innerRef={formikRef}
        initialValues={{
          infoTitle: "",
          description: "",
          examTypeId: "",
        }}
        validationSchema={yup.object({
          infoTitle: yup.string().required("Info title is required"),
          description: yup.string().required("Description is required"),

          examTypeId: yup.string().required("Exam Type is required"),
        })}
        onSubmit={async (values) => {
          if (data) {
            const editData = { id: data._id, values: values };
            await updateInfo(editData).then((res) => {
              if (res.error) {
                toast.error(res.error.data.message);
              } else {
                toast.success("Updated Info");
                // navigate("/auth/exam-types");
              }
            });
          } else {
            const addData = { values: values };
            await postInfo(addData.values).then((res) => {
              if (res.error) {
                toast.error(res.error.data.message);
              } else {
                toast.success("Added Info");
              }
            });
          }
        }}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col gap-3 w-2/3">
              <div className="flex flex-col">
                <label htmlFor="infoTitle" className="font-semibold ml-1">
                  Info Title *
                </label>
                <Field
                  type="text"
                  id="infoTitle"
                  name="infoTitle"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Info title"
                />
                <ErrorMessage name="infoTitle">
                  {(errorMessage) => (
                    <p className="text-red-500 mr-1">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="font-semibold ml-1">
                  Description *
                </label>
                <textarea
                  {...formik.getFieldProps("description")}
                  id="description"
                  name="description"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Info title"
                />
                <ErrorMessage name="description">
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
                disabled={postInfoLoading || updateInfoLoading}
              >
                {postInfoLoading || updateInfoLoading ? "Loading..." : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default InfoForm;
