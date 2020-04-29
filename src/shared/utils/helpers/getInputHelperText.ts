const getInputHelperText = (error: string, required?: boolean): string => {
  if (error) {
    return error;
  }

  if (!required) {
    return 'Optional';
  }

  return '';
};

export default getInputHelperText;
