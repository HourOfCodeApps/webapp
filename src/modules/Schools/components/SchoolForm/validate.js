import isEmail from 'shared/utils/validations/isEmail';
import isPhoneNumber from 'shared/utils/validations/isPhoneNumber';

const namePattern = /^[a-zA-Zа-яА-ЯЇїґҐєЄіІ' ]+$/;

const validate = (values) => {
  const errors = {};

  if (!values.addressBuilding) {
    errors.addressBuilding = 'Required';
  }

  if (!values.addressStreet) {
    errors.addressStreet = 'Required';
  }

  if (!values.city) {
    errors.city = 'Required';
  }

  if (!values.cityDistrict) {
    errors.cityDistrict = 'Required';
  }

  if (!values.latitude) {
    errors.latitude = 'Required';
  }

  if (!values.longitude) {
    errors.longitude = 'Required';
  }

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.subjectOfManagement) {
    errors.subjectOfManagement = 'Required';
  }

  if (!values.website) {
    errors.website = 'Required';
  }

  errors.phones = (values.phones || [])
    .map(p => (!p ? 'Required' : null));

  return errors;
};

export default validate;
