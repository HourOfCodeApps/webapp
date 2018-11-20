import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import RadioGroupField from 'shared/components/ReduxForm/RadioGroupField';
import CheckBoxField from 'shared/components/ReduxForm/CheckBoxField';
import TextField from 'shared/components/ReduxForm/TextField';
import { Heading, HeadingSm } from 'shared/components/TypographyStyled';
import { FlexBox } from 'shared/components/LayoutStyled';

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
    <Heading fontSize="24px" bolder halfLine margin="0 0 15px 0">Реєстрація</Heading>
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

    <Field
      component={CheckBoxField}
      label={(
        <p>
          Реєструючись на сайті Ви погоджуєтеся з його&nbsp;
          <a href="https://docs.google.com/document/d/19r8X00ld8fIJCXf9LNDaywiXSZM97UAQX93sodZCJCs">Правилами користування</a>
          &nbsp;та&nbsp;
          <a href="https://docs.google.com/document/d/1uBtF7_TPH9KZBxMbFtFKKGORXCDkG0wQF2bBDm9Mbak">Політикою приватності</a>
        </p>
      )}
      name="policyAgreed"
      required
      color="primary"
    />

    {formError && (
      <FlexBox margin="10px 0 10px 0">
        <HeadingSm error fontSize="14px">{formError.message}</HeadingSm>
      </FlexBox>
    )}
    <FlexBox margin="10px 0 20px 0">
      <Button
        fullWidth
        type="submit"
        disabled={pristine}
        variant="contained"
        color="primary"
      >
        Створити аккаунт
      </Button>
    </FlexBox>
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
