// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui-v3/core/TextField';

// Application
import getInputHelperText from 'shared/utils/helpers/getInputHelperText';

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
    helperText={getInputHelperText(touched && error, required)}
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
  placeholder: PropTypes.string,
};

TextField.defaultProps = {
  disabled: false,
  required: false,
  type: 'text',
  compact: false,
  placeholder: '',
};

export default TextField;
