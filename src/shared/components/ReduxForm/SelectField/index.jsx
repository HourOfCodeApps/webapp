import React from 'react';
import PropTypes from 'prop-types';
// import Select from 'react-select';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from 'shared/components/Select';

const SelectField = ({
  disabled,
  input,
  label,
  loading,
  multi,
  meta: { touched, error },
  required,
  searchable,
  options,
  placeholder,
}) => (
  <FormControl
    fullWidth
    error={touched && error}
    disabled={disabled}
  >
    {/* <InputLabel>{label}</InputLabel> */}
    <Select
      isLoading={loading}
      isSearchable={searchable}
      isMulti={multi}
      name={input.name}
      onChange={input.onChange}
      options={options}
      getOptionLabel={option => option.name}
      getOptionValue={option => option.id}
      value={input.value}
      textFieldProps={{
        label: `${label}${required ? ' *' : ''}`,
        InputLabelProps: {
          shrink: true,
        },
      }}
      placeholder={placeholder}
    />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

SelectField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  required: PropTypes.bool,
};

SelectField.defaultProps = {
  disabled: false,
  required: false,
  // getOptionLabel: undefined,
  // getOptionValue: undefined,
};

export default SelectField;
