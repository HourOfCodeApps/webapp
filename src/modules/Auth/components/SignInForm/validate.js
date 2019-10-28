import isEmail from 'shared/utils/validations/isEmail';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Обов\'язково';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Обов\'язково';
  }

  return errors;
};

export default validate;
