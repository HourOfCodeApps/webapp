// Vendor
import PropTypes from 'prop-types';

// Application
import TimePicker from 'shared/components/TimePicker';
import getInputHelperText from 'shared/utils/helpers/getInputHelperText';
import dayjs from 'dayjs';

const TimePickerField = ({
  compact,
  disabled,
  required,
  label,
  input,
  meta: { touched, error },
  placeholder,
  minutesStep,
  minTime,
  maxTime,
}) => (
  <TimePicker
    disabled={disabled}
    label={label}
    minTime={minTime && dayjs(minTime, 'HH:mm')}
    maxTime={maxTime && dayjs(maxTime, 'HH:mm')}
    value={input.value ? dayjs(input.value, 'HH:mm') : null}
    onChange={value => input.onChange(value ? value.format('HH:mm') : null)}
    fullWidth={!compact}
    error={touched && error}
    helperText={getInputHelperText(touched && error, required)}
    placeholder={placeholder}
    minutesStep={minutesStep}
  />
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
  minutesStep: PropTypes.number,
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
};

TimePickerField.defaultProps = {
  disabled: false,
  required: false,
  compact: false,
  placeholder: '',
};

export default TimePickerField;
