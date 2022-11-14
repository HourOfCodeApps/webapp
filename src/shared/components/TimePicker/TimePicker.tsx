import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';

import {
  TimePicker as MuiTimePicker,
  TimePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

type Props = TimePickerProps & {
  value?: DateTime;
  clearable?: boolean;
  minutesStep?: number;
};

const TimePicker = ({ value, ...props }: Props) => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <MuiTimePicker
      ampm={false}
      inputVariant="outlined"
      value={value || null}
      cancelLabel="Відміна"
      okLabel="Підтвердити"
      {...props}
    />
  </MuiPickersUtilsProvider>
);

export default TimePicker;
