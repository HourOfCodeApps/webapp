import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import TextField from 'shared/components/ReduxForm/TextField';
import FormControl from '@material-ui/core/FormControl';

import { SIGNIN_FORM_ID } from '../../constants';
import validate from './validate';

const SigninForm = ({
  handleSubmit,
  pristine,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={TextField}
      label="Email"
      name="email"
      required
    />
    <Field
      component={TextField}
      label="Password"
      name="password"
      type="password"
      required
    />
    {/* <div> */}
    <FormControl>
      <Button
        // fullWidth
        type="submit"
        disabled={pristine}
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
      <Button
        // fullWidth
        type="submit"
        disabled={pristine}
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>
    </FormControl>
    {/* </div> */}
  </form>
);

SigninForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SigninForm.defaultProps = {
};

export default reduxForm({
  form: SIGNIN_FORM_ID,
  validate,
})(SigninForm);

export { SigninForm as SigninFormComponent };
