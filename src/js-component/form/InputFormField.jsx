import { Input } from "../Other-component/form";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
function InputFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <Input
        //   label="Last name"
        //   type="text"
        onChange={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default InputFormField;
