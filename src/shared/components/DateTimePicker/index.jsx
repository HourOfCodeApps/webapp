import React from 'react';
import PropTypes from 'prop-types';
import LuxonUtils from '@date-io/luxon';

import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const DateTimePicker = ({ value, ...props }) => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <MuiDateTimePicker
      clearable
      ampm={false}
      variant="outlined"
      value={value || null}
      cancelLabel="Відміна"
      okLabel="Підтвердити"
      {...props}
    />
  </MuiPickersUtilsProvider>
);

DateTimePicker.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  clearable: PropTypes.bool,
};

DateTimePicker.defaultProps = {
  label: '',
  value: null,
  clearable: false,
};

export default DateTimePicker;
