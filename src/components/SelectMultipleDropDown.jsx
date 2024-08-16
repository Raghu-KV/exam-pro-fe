import { useField, useFormikContext } from "formik";
import Select from "react-select";

// Custom component to integrate react-select with Formik
const SelectMultipleDropDown = ({ name, options, isMulti, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <>
      <Select
        {...props}
        isMulti={isMulti}
        name={name}
        options={options}
        value={
          options
            ? options.filter((option) => field.value.includes(option.value))
            : ""
        }
        onChange={(option) =>
          setFieldValue(
            name,
            isMulti
              ? option.map((opt) => opt.value)
              : option
              ? option.value
              : ""
          )
        }
        onBlur={() => setFieldTouched(name, true)}
      />
      {/* {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null} */}
    </>
  );
};

export default SelectMultipleDropDown;
