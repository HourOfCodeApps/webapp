import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiTextField from '@material-ui/core/TextField';

const TextField = ({
  compact,
  disabled,
  required,
  label,
  input,
  meta: { touched, error },
  type,
  placeholder,
}) => (
  <MuiTextField
    // required={required}
    fullWidth={!compact}
    error={touched && error}
    disabled={disabled}
    label={label}
    value={input.value}
    onChange={input.onChange}
    name={input.name}
    margin="normal"
    helperText={(touched && error) ? error : (!required ? 'Optional' : '')}
    variant="outlined"
    type={type}
    placeholder={placeholder}
  />
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
  compact: PropTypes.bool,
  type: PropTypes.string,
};

TextField.defaultProps = {
  disabled: false,
  required: false,
  type: 'text',
  compact: false,
};

export default TextField;
