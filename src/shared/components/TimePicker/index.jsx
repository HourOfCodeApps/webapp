import React from 'react';
import PropTypes from 'prop-types';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';
import { TimePicker as MuiTimePicker } from 'material-ui-pickers';


const TimePicker = ({
  value, ...props
}) => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <MuiTimePicker
      ampm={false}
      variant="outlined"
      value={value || null}
      cancelLabel="Відміна"
      okLabel="Підтвердити"
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
