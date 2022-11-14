import dayjs from 'dayjs';

import TimePicker from 'shared/components/TimePicker';
import getInputHelperText from 'shared/utils/helpers/getInputHelperText';

type Props = {
  compact?: boolean;
  disabled?: boolean;
  required?: boolean;
  label: string;
  input: {
    value?: string;
    onChange: (value: string | null) => void;
  };
  meta: { touched: boolean; error?: string };
  placeholder?: string;
  minutesStep?: number;
  minTime?: string;
  maxTime: string;
};

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
}: Props) => (
  <TimePicker
    disabled={disabled}
    label={label}
    minTime={minTime ? dayjs(minTime, 'HH:mm') : undefined}
    maxTime={maxTime ? dayjs(maxTime, 'HH:mm') : undefined}
    value={input.value ? dayjs(input.value, 'HH:mm') : undefined}
    onChange={(value) => input.onChange(value ? value.format('HH:mm') : null)}
    fullWidth={!compact}
    error={touched && Boolean(error)}
    helperText={getInputHelperText(touched && error, required)}
    placeholder={placeholder}
    minutesStep={minutesStep}
  />
);

export default TimePickerField;
