import isEmail from 'shared/utils/validations/isEmail';
import isPhoneNumber from 'shared/utils/validations/isPhoneNumber';

const validate = (values) => {
  const errors = {};

  if (!values.role) {
    errors.role = 'Обов\'язково';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Обов\'язково';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Некоректна поштова скринька';
  }

  if (!values.password) {
    errors.password = 'Обов\'язково';
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

  if (!values.policyAgreed) {
    errors.policyAgreed = 'Обов\'язково';
  }

  return errors;
};

export default validate;
