import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RadioGroupField from 'shared/components/ReduxForm/RadioGroupField';
import CheckBoxField from 'shared/components/ReduxForm/CheckBoxField';
import SelectField from 'shared/components/ReduxForm/SelectField';
import TextField from 'shared/components/ReduxForm/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { SCHOOL_FORM_ID } from '../../constants';
import validate from './validate';

const renderPhones = ({ fields, meta: { error } }) => (
  <div>
    <Typography variant="subheading">
      Контактні номери
      <IconButton onClick={() => fields.push()}>
        <AddIcon />
      </IconButton>
    </Typography>
    {fields.map((phone, index) => (
      <div key={index}>
        <Field
          compact
          name={phone}
          type="text"
          component={TextField}
          label={`Номер #${index + 1}`}
          required
        />
        <IconButton
          onClick={() => fields.remove(index)}
          aria-label="Прибрати"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ))}
    {error && (
      <li className="error">
        {error}
      </li>
    )}
  </div>
);

const SchoolForm = (
  {
    handleSubmit,
    pristine,
  },
) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={TextField}
      label="Назва"
      name="name"
      required
    />
    <Field
      component={TextField}
      label="Місто"
      name="city"
      required
    />
    <Field
      component={TextField}
      label="Вулиця"
      name="addressStreet"
      required
    />
    <Field
      component={TextField}
      label="Будинок"
      name="addressBuilding"
      required
    />
    <Field
      component={TextField}
      label="Веб сторінка"
      name="website"
    />
    <FieldArray name="phones" component={renderPhones} />
    <div>
      <Button fullWidth type="submit" disabled={pristine}>Зберегти</Button>
    </div>
  </form>
);

SchoolForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SchoolForm.defaultProps = {
};

export default reduxForm({
  form: SCHOOL_FORM_ID,
  validate,
})(SchoolForm);

export { SchoolForm as SchoolFormComponent };
