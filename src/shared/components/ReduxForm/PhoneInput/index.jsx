// Vendor
import React from 'react';
import MuiTextField from '@material-ui-v3/core/TextField';
import PhoneInput from 'react-phone-number-input';

// Application
import getInputHelperText from 'shared/utils/helpers/getInputHelperText';

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
        helperText={getInputHelperText(touched && error, required)}
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
