import isEmail from 'shared/utils/validations/isEmail';

const validate = (values) => {
  const errors = {};

  if (!values.role) {
    errors.role = 'Required';
  }

  if (!values.fullName) {
    errors.fullName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  }

  return errors;
};

export default validate;
