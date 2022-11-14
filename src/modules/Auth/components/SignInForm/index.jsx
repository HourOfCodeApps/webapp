import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/dist/redux-form';
import Button from '@material-ui-v3/core/Button';

import TextField from 'shared/components/ReduxForm/TextField';
import FormControl from '@material-ui-v3/core/FormControl';

import { SIGNIN_FORM_ID } from '../../constants';
import validate from './validate';

const SigninForm = ({
  handleSubmit,
  pristine,
  submitLabel,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={TextField}
      label="Поштова скринька"
      name="email"
      required
    />
    <Field
      component={TextField}
      label="Пароль"
      name="password"
      type="password"
      required
    />
    <FormControl fullWidth style={{ marginTop: 10 }}>
      <Button
        type="submit"
        disabled={pristine}
        variant="contained"
        color="primary"
      >
        {submitLabel}
      </Button>
    </FormControl>
  </form>
);

SigninForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

SigninForm.defaultProps = {
  submitLabel: 'Увійти',
};

export default reduxForm({
  form: SIGNIN_FORM_ID,
  validate,
})(SigninForm);

export { SigninForm as SigninFormComponent };
