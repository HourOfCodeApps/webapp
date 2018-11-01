import get from 'lodash/get';
import { isValidPhoneNumber } from 'react-phone-number-input';

import isEmail from 'shared/utils/validations/isEmail';

const namePattern = /^[a-zA-Zа-яА-ЯЇїґҐєЄіІ' ]+$/;

const validate = (values) => {
  const errors = {
    profile: {},
    mentor: {},
    teacher: {},
  };

  if (!values.role) {
    errors.role = 'Required';
  }

  if (!get(values, 'profile.firstName')) {
    errors.profile.firstName = 'Required';
  } else if (!namePattern.test(values.profile.firstName)) {
    errors.profile.firstName = 'Invalid first name';
  }

  if (!get(values, 'profile.lastName')) {
    errors.lastName = 'Required';
  } else if (!namePattern.test(values.lastName)) {
    errors.lastName = 'Invalid last name';
  }

  if (!get(values, 'profile.email')) {
    errors.profile.email = 'Required';
  } else if (!isEmail(values.profile.email)) {
    errors.profile.email = 'Invalid email address';
  }

  if (!get(values, 'profile.phone')) {
    errors.profile.phone = 'Required';
  } else if (!isValidPhoneNumber(values.profile.phone)) {
    errors.profile.phone = 'Invalid phone number';
  }

  if (!get(values, 'teacher.school')) {
    errors.teacher.school = 'Required';
  }

  return errors;
};

export default validate;
