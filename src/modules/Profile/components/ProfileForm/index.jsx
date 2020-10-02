import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui-v3/core/Button';

import TextField from 'shared/components/ReduxForm/TextField';
import PhoneInput from 'shared/components/ReduxForm/PhoneInput';

import { PROFILE_FORM_ID } from '../../constants';
import validate from './validate';


const ProfileForm = (
  {
    handleSubmit,
    pristine,
    disabled,
  },
) => (
  <form onSubmit={handleSubmit}>
    <Field
      disabled={disabled}
      component={TextField}
      label="Ім'я"
      name="firstName"
      required
    />
    <Field
      disabled={disabled}
      component={TextField}
      label="Прізвище"
      name="lastName"
      required
    />
    {/* <Field
      disabled={disabled}
      component={TextField}
      label="Поштова скринька"
      name="email"
      required
    /> */}
    <Field
      disabled={disabled}
      component={PhoneInput}
      label="Телефон"
      name="phone"
      required
    />
    <div>
      <Button
        color="primary"
        fullWidth
        margin="normal"
        variant="contained"
        size="large"
        type="submit"
        disabled={disabled || pristine}
      >
        Оновити
      </Button>
    </div>
  </form>
);

ProfileForm.propTypes = {
  disabled: PropTypes.bool,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  disabled: false,
};

export default reduxForm({
  form: PROFILE_FORM_ID,
  validate,
})(ProfileForm);


export { ProfileForm as ProfileFormComponent };
