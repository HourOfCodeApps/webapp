import isEmail from 'shared/utils/validations/isEmail';
import isPhoneNumber from 'shared/utils/validations/isPhoneNumber';

const namePattern = /^[a-zA-Zа-яА-ЯЇїґҐєЄіІ' ]+$/;

const validate = (values) => {
  const errors = {};

  if (!values.role) {
    errors.role = 'Required';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (!namePattern.test(values.firstName)) {
    errors.firstName = 'Invalid first name';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (!namePattern.test(values.lastName)) {
    errors.lastName = 'Invalid last name';
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

  if (values.phone && !isPhoneNumber(values.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!values.school) {
    errors.school = 'Required';
  }

  return errors;
};

export default validate;
