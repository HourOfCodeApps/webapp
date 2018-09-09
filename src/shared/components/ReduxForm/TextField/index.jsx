import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextField = ({
  disabled,
  required,
  label,
  input,
  meta: { touched, error },
}) => (
  <FormControl
    fullWidth
    error={touched && error}
    disabled={disabled}
  >
    <InputLabel>
      {label}
      &nbsp;
      {required && <span>*</span>}
    </InputLabel>
    <Input
      value={input.value}
      onChange={input.onChange}
      name={input.name}
    />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

TextField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  required: PropTypes.bool,
};

TextField.defaultProps = {
  disabled: false,
  required: false,
};

export default TextField;
