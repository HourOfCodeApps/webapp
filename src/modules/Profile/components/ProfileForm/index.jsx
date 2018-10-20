import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import TextField from 'shared/components/ReduxForm/TextField';

import { PROFILE_FORM_ID } from '../../constants';
import validate from './validate';


const ProfileForm = (
  {
    handleSubmit,
    pristine,
  },
) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={TextField}
      label="Ім'я"
      name="firstName"
      required
    />
    <Field
      component={TextField}
      label="Прізвище"
      name="lastName"
      required
    />
    <Field
      component={TextField}
      label="Поштова скринька"
      name="email"
      required
    />
    <Field
      component={TextField}
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
        disabled={pristine}
      >
        Оновити
      </Button>
    </div>
  </form>
);

ProfileForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: PROFILE_FORM_ID,
  validate,
})(ProfileForm);


export { ProfileForm as ProfileFormComponent };
