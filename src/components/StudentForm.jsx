import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";
import { useLazyGetAllGroupsForDropDownQuery } from "../redux/requests/groupRequest";
import {
  useAddStudentMutation,
  useEditStudentMutation,
} from "../redux/requests/studentRequest";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = yup.object({
  studentName: yup.string().required("Student Name is required"),
  rollNo: yup.string().required("Roll number is required"),
  enrolledExamTypeId: yup.string().required("Exam Type is required"),
  groupId: yup.string().required("Group is required"),
  phoneNo: yup
    .number("Phone No must be a number")
    .min(1)
    .required("Phone number is required"),
});

function StudentForm({ data, isLoading, isFetching }) {
  const [
    triggerExamTypes,
    { data: examTypesData, isLoading: isExamTypesLoading },
  ] = useLazyGetExamTypeForDropDownQuery();
  const [triggerGroups, { data: groupTypesData, isLoading: isGroupsLoading }] =
    useLazyGetAllGroupsForDropDownQuery();

  const formikRef = useRef();

  useEffect(() => {
    triggerExamTypes();
    triggerGroups();
  }, [triggerExamTypes, triggerGroups]);

  const examTypes = examTypesData?.map((examType) => ({
    name: examType.examType,
    id: examType.examTypeId,
  }));

  const groupTypes = groupTypesData?.map((groupType) => ({
    name: groupType.groupName,
    id: groupType.groupId,
  }));

  const [addStudent, { isLoading: addStudentLoading }] =
    useAddStudentMutation();
  const [editStudent, { isLoading: editStudentLoading }] =
    useEditStudentMutation();

  useEffect(() => {
    if (data) {
      formikRef.current.setValues({
        rollNo: data.rollNo || "",
        studentName: data.studentName || "",
        enrolledExamTypeId: data.enrolledExamTypeId || "",
        groupId: data.groupId || "",
        phoneNo: data.phoneNo || "",
      });
    }
  }, [data]);

  if (isExamTypesLoading || isGroupsLoading || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Toaster />
      <Formik
        innerRef={formikRef}
        initialValues={{
          rollNo: "",
          studentName: "",
          enrolledExamTypeId: "",
          groupId: "",
          phoneNo: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            if (data) {
              const editData = { id: data._id, values };
              await editStudent(editData).unwrap();
              toast.success("Student updated successfully");
            } else {
              await addStudent(values).unwrap();
              toast.success("Student added successfully");
            }
          } catch (error) {
            toast.error(error.data.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-2/3">
            <div className="flex flex-col">
              <label htmlFor="studentName" className="font-semibold ml-1">
                Student name *
              </label>
              <Field
                type="text"
                id="studentName"
                name="studentName"
                className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400 focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                placeholder="Student name"
              />
              <ErrorMessage name="studentName">
                {(msg) => <p className="text-red-500">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="flex flex-col">
              <label htmlFor="rollNo" className="font-semibold ml-1">
                Roll No *
              </label>
              <Field
                type="text"
                id="rollNo"
                name="rollNo"
                className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400 focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                placeholder="Roll No"
              />
              <ErrorMessage name="rollNo">
                {(msg) => <p className="text-red-500">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="groupId" className="font-semibold ml-1">
                  Group *
                </label>
                <Field
                  as="select"
                  id="groupId"
                  name="groupId"
                  className="border-appGray border px-2 py-3 rounded-xl w-full focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                >
                  <option value="">-Select group-</option>
                  {groupTypes?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="groupId">
                  {(msg) => <p className="text-red-500">{msg}</p>}
                </ErrorMessage>
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="enrolledExamTypeId"
                  className="font-semibold ml-1"
                >
                  Exam type *
                </label>
                <Field
                  as="select"
                  id="enrolledExamTypeId"
                  name="enrolledExamTypeId"
                  className="border-appGray border px-2 py-3 rounded-xl w-full focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                >
                  <option value="">-Select exam type-</option>
                  {examTypes?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="enrolledExamTypeId">
                  {(msg) => <p className="text-red-500">{msg}</p>}
                </ErrorMessage>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="phoneNo" className="font-semibold ml-1">
                  Phone No *
                </label>
                <Field
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400 focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Phone No"
                />
                <ErrorMessage name="phoneNo">
                  {(msg) => <p className="text-red-500">{msg}</p>}
                </ErrorMessage>
              </div>
            </div>

            <button
              className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
              type="submit"
              disabled={isSubmitting || addStudentLoading || editStudentLoading}
            >
              {addStudentLoading || editStudentLoading
                ? "Loading..."
                : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentForm;
