import { useFormikContext } from "formik";
import { Button } from "../Other-component/form";
function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button className="entryFormButton" onClick={handleSubmit} text={title} />
  );
}

export default SubmitButton;
