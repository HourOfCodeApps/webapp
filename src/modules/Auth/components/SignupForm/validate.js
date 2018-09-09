const validate = (values) => {
  const errors = {};

  if (!values.role) {
    errors.role = 'Required';
  }

  if (!values.fullName) {
    errors.fullName = 'Required';
  }

  if (!values.email) {
    errors.name = 'Required';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  }

  return errors;
};

export default validate;
