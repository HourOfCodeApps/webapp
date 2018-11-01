import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';


import RadioGroupField from 'shared/components/ReduxForm/RadioGroupField';
import CheckBoxField from 'shared/components/ReduxForm/CheckBoxField';
import SelectField from 'shared/components/ReduxForm/SelectField';
import TextField from 'shared/components/ReduxForm/TextField';
import PhoneInput from 'shared/components/ReduxForm/PhoneInput';

import { COMPLETE_SIGNUP_FORM_ID } from '../../constants';
import validate from './validate';

const SignupForm = (
  {
    handleSubmit,
    initialValues,
    pristine,
    role,
    schools,
    schoolsLoading,
  },
) => (
  <form onSubmit={handleSubmit}>
    {!initialValues.role && (
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
    )}
    {!initialValues.mentor.wasMentorBefore && role === 'mentor' && (
      <Field
        component={CheckBoxField}
        label="Я вже був ментором раніше"
        name="mentor.wasMentorBefore"
        required
        color="primary"
      />
    )}
    {!initialValues.profile.firstName && (
      <Field
        component={TextField}
        label="Ім'я"
        name="profile.firstName"
        required
      />
    )}
    {!initialValues.profile.lastName && (
      <Field
        component={TextField}
        label="Прізвище"
        name="profile.lastName"
        required
      />
    )}
    {!initialValues.profile.email && (
      <Field
        component={TextField}
        label="Поштова скринька"
        name="profile.email"
        required
      />
    )}
    {!initialValues.profile.phone && (
      <Field
        component={PhoneInput}
        label="Телефон"
        name="profile.phone"
        required
      />
    )}
    {!initialValues.teacher.school && (initialValues.role === 'teacher' || role === 'teacher') && (
      <Field
        component={SelectField}
        label="Школа"
        name="teacher.school"
        required
        searchable
        loading={schoolsLoading}
        options={Array.isArray(schools) ? schools : []}
        placeholder="Школа"
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
  form: COMPLETE_SIGNUP_FORM_ID,
  validate,
})(SignupForm);

const selector = formValueSelector(COMPLETE_SIGNUP_FORM_ID);
export default connect((state) => {
  const role = selector(state, 'role');
  return {
    role,
  };
})(form);

export { SignupForm as SignupFormComponent };
