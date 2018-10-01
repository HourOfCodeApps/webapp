import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const CheckBoxField = ({
  color, input, label, meta: { error, touched }, required,
}) => (
  <FormControl
    fullWidth
    required={required}
    error={touched && error}
  >
    <FormGroup>
      <FormControlLabel
        control={(
          <Checkbox
            checked={input.value === true}
            onChange={input.onChange}
            name={input.name}
            color={color}
          />
        )}
        label={label}
      />
    </FormGroup>
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);


CheckBoxField.propTypes = {
  color: PropTypes.string,
  input: PropTypes.shape(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  required: PropTypes.bool,
};

CheckBoxField.defaultProps = {
  color: undefined,
  required: false,
};

export default CheckBoxField;
