import React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import PhoneInput from 'react-phone-number-input';

class Phone extends React.Component {
  Wrapper = ({ onChange, ...props }) => {
    const {
      required,
      label,
      input,
      meta: { touched, error },
      placeholder,
    } = this.props;
    return (
      <MuiTextField
        {...props}
        fullWidth
        onChange={({ target }) => onChange(target.value)}
        margin="normal"
        variant="outlined"
        error={touched && error}
        label={label}
        name={input.name}
        helperText={(touched && error) ? error : (!required ? 'Optional' : '')}
        placeholder={placeholder}
      />
    );
  };

  render() {
    const { input, disabled } = this.props;

    return (
      <PhoneInput
        disabled={disabled}
        country="UA"
        showCountrySelect={false}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        inputComponent={this.Wrapper}
      />
    );
  }
}

export default Phone;
