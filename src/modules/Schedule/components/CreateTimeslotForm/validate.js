const validate = (values) => {
  const errors = {};

  if (!values.startTime) {
    errors.startTime = 'Обов\'язково';
  }

  if (!values.class) {
    errors.class = 'Обов\'язково';
  }

  if (!values.pupilsCount) {
    errors.pupilsCount = 'Обов\'язково';
  } else if (!/^\d+$/.test(values.pupilsCount)) {
    errors.pupilsCount = 'Має бути число';
  }

  return errors;
};

export default validate;
