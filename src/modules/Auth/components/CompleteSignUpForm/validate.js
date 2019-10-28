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
    errors.role = 'Обов\'язково';
  }

  if (!get(values, 'profile.firstName')) {
    errors.profile.firstName = 'Обов\'язково';
  } else if (!namePattern.test(values.profile.firstName)) {
    errors.profile.firstName = 'Invalid first name';
  }

  if (!get(values, 'profile.lastName')) {
    errors.lastName = 'Обов\'язково';
  } else if (!namePattern.test(values.lastName)) {
    errors.lastName = 'Invalid last name';
  }

  if (!get(values, 'profile.email')) {
    errors.profile.email = 'Обов\'язково';
  } else if (!isEmail(values.profile.email)) {
    errors.profile.email = 'Invalid email address';
  }

  if (!get(values, 'profile.phone')) {
    errors.profile.phone = 'Обов\'язково';
  } else if (!isValidPhoneNumber(values.profile.phone)) {
    errors.profile.phone = 'Invalid phone number';
  }

  if (!get(values, 'teacher.school')) {
    errors.teacher.school = 'Обов\'язково';
  }

  return errors;
};

export default validate;
