import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

const RadioGroupField = ({
  color, disabled, input, label, labelKey, options, valueKey, meta: { error, touched }, horizontal,
}) => (
  <FormControl
    fullWidth
    error={touched && error}
    disabled={disabled}
  >
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup
      aria-label={label}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      row={horizontal}
    >
      {options.map(option => (
        <FormControlLabel
          key={option[valueKey]}
          value={option[valueKey]}
          control={<Radio color={color} />}
          label={option[labelKey]}
        />
      ))}
    </RadioGroup>
    {touched && error && <FormHelperText>{error}</FormHelperText>}
    {/* {touched && error && <span>{error}</span>} */}
  </FormControl>
);


RadioGroupField.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.shape(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  labelKey: PropTypes.string,
  options: PropTypes.shape([PropTypes.object]).isRequired,
  valueKey: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  horizontal: PropTypes.bool,
};

RadioGroupField.defaultProps = {
  color: undefined,
  disabled: false,
  labelKey: 'label',
  valueKey: 'value',
  horizontal: false,
};

export default RadioGroupField;
