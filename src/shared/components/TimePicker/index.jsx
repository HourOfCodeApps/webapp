import React from 'react';
import PropTypes from 'prop-types';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';
import { TimePicker as Picker } from 'material-ui-pickers';


const TimePicker = ({
  value, ...props
}) => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <Picker
      clearable
      ampm={false}
      variant="outlined"
      value={value || null}
      {...props}
    />
  </MuiPickersUtilsProvider>
);

TimePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
};

TimePicker.defaultProps = {
  value: null,
};

export default TimePicker;
