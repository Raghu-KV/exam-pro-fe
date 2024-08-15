import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";

import {
  useAddGroupMutation,
  useEditGroupMutation,
} from "../redux/requests/groupRequest";
import toast, { Toaster } from "react-hot-toast";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";

// Define validation schema
const validationSchema = yup.object({
  groupName: yup.string().required("Group Name is required"),
  examTypeId: yup.string().required("Exam Type is required"),
});

function GroupForm({ data, isLoading, isFetching }) {
  const [
    triggerExamTypes,
    { data: examTypesData, isLoading: isExamTypesLoading },
  ] = useLazyGetExamTypeForDropDownQuery();

  const formikRef = useRef();

  const [postGroup, { isLoading: postGroupLoading }] = useAddGroupMutation();
  const [updateGroup, { isLoading: updateGroupLoading }] =
    useEditGroupMutation();

  useEffect(() => {
    triggerExamTypes();
  }, [triggerExamTypes]);

  useEffect(() => {
    if (data && formikRef.current) {
      formikRef.current.setValues({
        groupName: data.groupName || "",
        examTypeId: data.examTypeId || "",
      });
    }
  }, [data]);

  const examTypes = examTypesData?.map((examType) => ({
    name: examType.examType,
    id: examType.examTypeId,
  }));

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (data) {
        const editData = { id: data._id, values };
        const result = await updateGroup(editData).unwrap();
        toast.success("Group updated successfully");
      } else {
        const addData = { values };
        const result = await postGroup(addData).unwrap();
        toast.success("Group added successfully");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  if (isExamTypesLoading || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Toaster />
      <Formik
        innerRef={formikRef}
        initialValues={{
          groupName: "",
          examTypeId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-2/3">
            <div className="flex flex-col">
              <label htmlFor="groupName" className="font-semibold ml-1">
                Group Name *
              </label>
              <Field
                type="text"
                id="groupName"
                name="groupName"
                className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400 focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                placeholder="Group name"
              />
              <ErrorMessage name="groupName">
                {(msg) => <p className="text-red-500">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="flex flex-col">
              <label htmlFor="examTypeId" className="font-semibold ml-1">
                Exam Type *
              </label>
              <Field
                as="select"
                id="examTypeId"
                name="examTypeId"
                className="border-appGray border px-2 py-3 rounded-xl w-full focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
              >
                <option value="">-Select exam type-</option>
                {examTypes?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="examTypeId">
                {(msg) => <p className="text-red-500">{msg}</p>}
              </ErrorMessage>
            </div>

            <button
              className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
              type="submit"
              disabled={isSubmitting || postGroupLoading || updateGroupLoading}
            >
              {postGroupLoading || updateGroupLoading ? "Loading..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default GroupForm;
