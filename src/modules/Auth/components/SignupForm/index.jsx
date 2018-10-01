import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import RadioGroupField from 'shared/components/ReduxForm/RadioGroupField';
import CheckBoxField from 'shared/components/ReduxForm/CheckBoxField';
import TextField from 'shared/components/ReduxForm/TextField';

import { SIGNUP_FORM_ID } from '../../constants';
import validate from './validate';

const SignupForm = (
  {
    handleSubmit,
    pristine,
    role,
  },
) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={RadioGroupField}
      label="I am"
      name="role"
      options={[
        { value: 'mentor', label: 'Mentor' },
        { value: 'teacher', label: 'Teacher' },
      ]}
      color="primary"
    />
    <Field
      component={TextField}
      label="Name"
      name="fullName"
      required
    />
    <Field
      component={TextField}
      label="Email"
      name="email"
      required
    />
    <Field
      component={TextField}
      label="Phone number"
      name="phone"
      required
    />
    {role === 'mentor' && (
      <Field
        component={CheckBoxField}
        label="I was mentor before"
        name="wasMentorBefore"
        required
        color="primary"
      />
    )}
    <div>
      <Button fullWidth type="submit" disabled={pristine}>Signup</Button>
    </div>
  </form>
);

SignupForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

SignupForm.defaultProps = {
};

const form = reduxForm({
  form: SIGNUP_FORM_ID,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(SignupForm);

const selector = formValueSelector(SIGNUP_FORM_ID);
export default connect((state) => {
  const role = selector(state, 'role');
  return {
    role,
  };
})(form);

export { SignupForm as SignupFormComponent };
