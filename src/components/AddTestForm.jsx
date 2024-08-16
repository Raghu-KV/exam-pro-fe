import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import { useLazyGetExamTypeForDropDownQuery } from "../redux/requests/examTypeRequest";
import {
  useAddTestMutation,
  useUpdateTestMutation,
} from "../redux/requests/testTypesRequest";
import { useLazyGetAllGroupsForDropDownQuery } from "../redux/requests/groupRequest";

import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import SelectMultipleDropDown from "./SelectMultipleDropDown";

function AddTestForm({ data, isLoading, isFetching }) {
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

  const [invoke, responce] = useLazyGetAllGroupsForDropDownQuery();

  useEffect(() => {
    const fetch = async () => {
      await invoke();
    };
    fetch();
  }, []);

  const options = responce?.data?.map((groupType) => {
    return { value: groupType.groupId, label: groupType.groupName };
  });

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  const formikRef = useRef();

  const [addTest, { isLoading: addTestLoading }] = useAddTestMutation();
  const [updateTest, { isLoading: updateTestLoading }] =
    useUpdateTestMutation();

  useEffect(() => {
    if (data) {
      formikRef?.current?.setFieldValue("testName", data.testName);
      formikRef?.current?.setFieldValue("examTypeId", data.examTypeId);
      formikRef?.current?.setFieldValue("groupsId", data.groupsId);
    }
  }, [formikRef, data, isLoading, isFetching]);

  //   console.log(formikRef.current);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(59, 130, 246, 0.1)" : "white", // Tailwind bg-blue-100
      color: state.isFocused ? "rgb(29, 78, 216)" : "rgb(55, 65, 81)", // Tailwind text-blue-800
      padding: "0.5rem", // Tailwind p-2
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "0.25rem", // Tailwind mt-1
      // cursor: "pointer",
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: "rgb(151 163 182)", // Tailwind border-gray-300
      borderRadius: "0.75rem", // Tailwind rounded-md
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)", // Tailwind shadow-sm
      padding: "0.3rem 0.5rem",
      ":hover": {
        backgroundColor: "transparent", // No color change on hover
      },
    }),
  };

  if (result.isLoading || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] m-2">
      <Toaster />
      <Formik
        innerRef={formikRef}
        initialValues={{
          testName: "",
          examTypeId: "",
          groupsId: [],
        }}
        validationSchema={yup.object({
          testName: yup.string().required("Test Name is required"),

          examTypeId: yup.string().required("Exam Type is required"),
          groupsId: yup
            .array()
            .of(yup.string())
            .min(1, "Any one group must be selected")
            .required("Group is required"),
        })}
        onSubmit={async (values) => {
          if (data) {
            const editData = { id: data._id, values: values };
            await updateTest(editData).then((res) => {
              if (res.error) {
                toast.error("Error");
              } else {
                toast.success("Updated exam type");
                // navigate("/auth/exam-types");
              }
            });
          } else {
            const addData = { values: values };
            await addTest(addData.values).then((res) => {
              if (res.error) {
                toast.error("Error");
              } else {
                toast.success("Added exam type");
              }
            });
          }
        }}
      >
        {(formik) => {
          console.log(formik, "FORMSSSS");

          return (
            <Form className="flex flex-col gap-3 w-2/3">
              <div className="flex flex-col">
                <label htmlFor="testName" className="font-semibold ml-1">
                  Test name *
                </label>
                <Field
                  type="string"
                  id="testName"
                  name="testName"
                  className="border-appGray border px-2 py-3 rounded-xl w-full placeholder-slate-400  focus:outline-none focus:border-appGreen focus:ring-1 focus:ring-appGreen"
                  placeholder="Test name"
                />
                <ErrorMessage name="testName">
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

              <div className="flex flex-col">
                <label htmlFor="examType" className="font-semibold ml-1">
                  Group *
                </label>
                <Select
                  isMulti
                  name="groupsId"
                  options={options}
                  styles={customStyles}
                  value={
                    options
                      ? options.filter((option) =>
                          formik.values.groupsId.includes(option.value)
                        )
                      : ""
                  }
                  onChange={(option) => {
                    console.log(option);
                    formik.setFieldValue(
                      "groupsId",
                      option.map((opt) => opt.value)
                    );
                  }}
                />

                {/* <SelectMultipleDropDown
                  isMulti
                  name="groupId"
                  options={options}
                  styles={customStyles}
                /> */}
                <ErrorMessage name="groupsId">
                  {(errorMessage) => (
                    <p className="text-red-500 mr-1">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>

              <button
                className="w-full bg-appGreen text-white px-2 py-3 rounded-xl hover:scale-105 duration-200"
                type="submit"
                disabled={addTestLoading || updateTestLoading}
              >
                {addTestLoading || updateTestLoading ? "Loading..." : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddTestForm;
