

const isNumber = /^\d+(\.\d*|)$/;

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

  if (!values.latitude) {
    errors.latitude = 'Required';
  } else if (!isNumber.test(values.latitude)) {
    errors.latitude = 'Має бути числом';
  }

  if (!values.longitude) {
    errors.longitude = 'Required';
  } else if (!isNumber.test(values.longitude)) {
    errors.longitude = 'Має бути числом';
  }

  errors.phones = (values.phones || [])
    .map(p => (!p ? 'Required' : null));

  return errors;
};

export default validate;
