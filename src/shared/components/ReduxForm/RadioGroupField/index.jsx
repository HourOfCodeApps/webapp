import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioGroupField = ({
  color, input, label, labelKey, options, valueKey, meta: { error, touched },
}) => (
  <FormControl fullWidth>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup
      aria-label={label}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
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
    {touched && error && <span>{error}</span>}
  </FormControl>
);


RadioGroupField.propTypes = {
  color: PropTypes.string,
  input: PropTypes.shape(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  labelKey: PropTypes.string,
  options: PropTypes.shape([PropTypes.object]).isRequired,
  valueKey: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
};

RadioGroupField.defaultProps = {
  color: undefined,
  labelKey: 'label',
  valueKey: 'value',
};

export default RadioGroupField;
