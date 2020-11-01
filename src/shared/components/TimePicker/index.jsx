import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

import { TimePicker as MuiTimePicker } from '@material-ui/pickers';

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
      minDate="09:00"
      {...props}
    />
  </MuiPickersUtilsProvider>
);

TimePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  clearable: PropTypes.bool,
};

TimePicker.defaultProps = {
  value: null,
  clearable: false,
};

export default TimePicker;
