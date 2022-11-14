import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form/dist/redux-form';
import Button from '@material-ui-v3/core/Button';

import IconButton from '@material-ui-v3/core/IconButton';
import DeleteIcon from '@material-ui-v3/icons/Delete';
import AddIcon from '@material-ui-v3/icons/Add';
import TextField from 'shared/components/ReduxForm/TextField';
import Typography from '@material-ui-v3/core/Typography';

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
    <Field
      component={TextField}
      label="Широта"
      name="latitude"
      required
      // normalize={parseFloat}
    />
    <Field
      component={TextField}
      label="Довгота"
      name="longitude"
      required
      // normalize={parseFloat}
    />
    <FieldArray
      name="phones"
      component={renderPhones}
      required
    />
    <Button fullWidth type="submit" disabled={pristine}>Зберегти</Button>
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
