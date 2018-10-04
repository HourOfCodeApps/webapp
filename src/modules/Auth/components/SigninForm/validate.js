import isEmail from 'shared/utils/validations/isEmail';

const validate = (values) => {
  const errors = {};

  console.log('validate', values);

  if (!values.email) {
    errors.email = 'Required';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

export default validate;
