
const getInputHelperText = (error, required) => {
  if (error) {
    return error;
  }

  if (!required) {
    return 'Optional';
  }

  return '';
};

export default getInputHelperText;
