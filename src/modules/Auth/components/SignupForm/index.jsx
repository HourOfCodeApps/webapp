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
    formError,
  },
) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={RadioGroupField}
      label="Я хочу бути:"
      name="role"
      options={[
        { value: 'mentor', label: 'Ментором' },
        { value: 'teacher', label: 'Представником школи' },
      ]}
      horizontal
      color="primary"
    />
    {role === 'mentor' && (
      <Field
        component={CheckBoxField}
        label="Я вже був ментором раніше"
        name="wasMentorBefore"
        required
        color="primary"
      />
    )}
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
      required
      type="password"
    />
    {formError && (
      <div style={{ marginTop: 20 }}>
        {formError.message}
      </div>
    )}
    <div style={{ marginTop: 20 }}>
      <Button
        fullWidth
        type="submit"
        disabled={pristine}
        variant="contained"
        color="primary"
      >
        Signup
      </Button>
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
