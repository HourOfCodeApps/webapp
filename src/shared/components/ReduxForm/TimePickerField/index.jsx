// Vendor
import React from 'react';
import PropTypes from 'prop-types';

// Application
import TimePicker from 'shared/components/TimePicker';
import getInputHelperText from 'shared/utils/helpers/getInputHelperText';

const TimePickerField = ({
  compact,
  disabled,
  required,
  label,
  input,
  meta: { touched, error },
  placeholder,
}) => (
  // <FormControl
  //   fullWidth
  //   margin="normal"
  // >
  <TimePicker
    disabled={disabled}
    label={label}
    value={input.value}
    onChange={input.onChange}
    margin="normal"
    fullWidth={!compact}
    error={touched && error}
    helperText={getInputHelperText(touched && error, required)}
    placeholder={placeholder}
  />
  // <MuiTextField
  //   // required={required}
  //   fullWidth={!compact}
  //   error={touched && error}
  //   disabled={disabled}
  //   label={label}
  //   value={input.value}
  //   onChange={input.onChange}
  //   name={input.name}
  //   margin="normal"
  //   helperText={(touched && error) ? error : (!required ? 'Optional' : '')}
  //   variant="outlined"
  //   type={type}
  //   placeholder={placeholder}
  // />
);

TimePickerField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  required: PropTypes.bool,
  compact: PropTypes.bool,
  placeholder: PropTypes.string,
};

TimePickerField.defaultProps = {
  disabled: false,
  required: false,
  compact: false,
  placeholder: '',
};

export default TimePickerField;
