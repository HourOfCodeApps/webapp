import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'shared/components/DateTimePicker';
import getInputHelperText from 'shared/utils/helpers/getInputHelperText';

const DateTimePickerField = ({
  compact,
  disabled,
  required,
  label,
  input,
  meta: { touched, error },
  placeholder,
  ...props
}) => (
  <DateTimePicker
    disabled={disabled}
    label={label}
    value={input.value}
    onChange={input.onChange}
    margin="normal"
    fullWidth={!compact}
    error={touched && error}
    helperText={getInputHelperText(touched && error, required)}
    {...props}
  />
);

DateTimePickerField.propTypes = {
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

DateTimePickerField.defaultProps = {
  disabled: false,
  required: false,
  type: 'text',
  compact: false,
};

export default DateTimePickerField;
