import React from 'react';
import PropTypes from 'prop-types';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';
import { TimePicker as Picker } from 'material-ui-pickers';


const TimePicker = ({ label, value, onChange, ...props }) => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <Picker
      clearable
      ampm={false}
      label={label}
      variant="outlined"
      value={value || null}
      onChange={onChange}
      // helperText={(touched && error) ? error : (!required ? 'Optional' : '')}
      // error="FUCK"
      // helperText="Hello"
      {...props}
    />
  </MuiPickersUtilsProvider>
);

TimePicker.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
};

TimePicker.defaultProps = {
  label: '',
  value: null,
};

export default TimePicker;
