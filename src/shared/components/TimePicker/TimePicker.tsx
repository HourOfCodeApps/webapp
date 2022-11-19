import { Dayjs } from 'dayjs';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

type Props = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  onChange: (newValue: Dayjs | null) => void;
  value: Dayjs | undefined;
  minutesStep?: number;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
};

const TimePicker = ({ onChange, error, helperText, ...props }: Props) => (
  <LocalizationProvider
    dateAdapter={AdapterDayjs}
    localeText={{
      cancelButtonLabel: 'Скасувати',
      okButtonLabel: 'Підтвердити',
    }}
  >
    <MobileTimePicker
      ampm={false}
      renderInput={(params) => (
        <TextField
          margin="normal"
          {...params}
          error={error}
          helperText={helperText}
        />
      )}
      onChange={(newValue) => onChange(newValue ? newValue : null)}
      {...props}
    />
  </LocalizationProvider>
);

export default TimePicker;
