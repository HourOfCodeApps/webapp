import React from 'react';
import PropTypes from 'prop-types';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';

import {
  TimePicker as MuiTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const TimePicker = ({
  value, ...props
}) => (
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

TimePicker.propTypes = {
  value: PropTypes.instanceOf(DateTime),
  clearable: PropTypes.bool,
  minutesStep: PropTypes.number,
};

TimePicker.defaultProps = {
  value: null,
  clearable: false,
};

export default TimePicker;
