const validate = (values) => {
  const errors = {};

  if (!values.startTime) {
    errors.startTime = 'Required';
  }

  if (!values.class) {
    errors.class = 'Required';
  }

  if (!values.pupilsCount) {
    errors.pupilsCount = 'Required';
  } else if (!/^\d+$/.test(values.pupilsCount)) {
    errors.pupilsCount = 'Should be a number';
  }

  return errors;
};

export default validate;
