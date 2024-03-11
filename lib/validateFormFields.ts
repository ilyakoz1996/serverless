export default function ValidateFormFields({
  fields,
  errors,
  loading
}: {
  fields?: any;
  errors?: any;
  loading?: any;
}): boolean {

  let errorsMessages: boolean = false;
  let emptyRequiredFields: boolean = false;
  let loadingState: boolean = false;

  if (loading) {
    const loadingKeys = Object.keys(loading);
    loadingKeys.map((key: string) => {
        if (loading[key] === true) {
            loadingState = true;
        }
      });
  }

  if (errors) {
    const errorsKeys = Object.keys(errors);
    errorsKeys.map((key: string) => {
      if (errors[key]?.message?.length > 0) {
        errorsMessages = true;
      }
    });
  }

  if (fields) {
    const fieldsKeys = Object.keys(fields);
    if (fieldsKeys.length > 0) {
        fieldsKeys.map((key: string) => {
        if (fields[key] === undefined) { emptyRequiredFields = true }
        if (fields[key]?.toString()?.length === 0) {
          emptyRequiredFields = true;
        }
      });
    }
  }

  const isDisabled = emptyRequiredFields || errorsMessages || loadingState

  return isDisabled;
}
