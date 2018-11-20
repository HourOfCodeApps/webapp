import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';
import get from 'lodash/get';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withSchools } from 'modules/Schools';

import CompleteSignUpForm from '../../components/CompleteSignUpForm';

import {
  updateUser,
} from '../../actions';

// import withAuth from '../../HoCs/withAuth';
import withUser from '../../HoCs/withUser';

const styles = theme => ({
  paper: {
    width: '500px',
    maxWidth: '80%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class CompleteSignUp extends React.Component {
  static propTypes = {
    auth: PropTypes.shape(PropTypes.object).isRequired,
    classes: PropTypes.shape(PropTypes.object).isRequired,
    onCompleteSignUp: PropTypes.func.isRequired,
    user: PropTypes.shape(PropTypes.object).isRequired,
  };


  handleSubmit = (formData) => {
    const { onCompleteSignUp } = this.props;
    const userData = {
      profile: get(formData, 'profile', {}),
      [formData.role]: get(formData, formData.role, {}),
    };
    onCompleteSignUp(userData);
  }

  render() {
    const {
      handleSubmit,
      props: {
        onCompleteSignUp,
        auth,
        classes,
        schools,
        schoolsFetching,
        user: {
          uid,
          profile,
          mentor,
        },
        user,
      },
    } = this;

    const schoolId = get(user.teacher, 'schoolId');
    const school = !schoolId ? null : schools.find(s => s.id === schoolId);

    const initialValues = {
      profile: pick(profile, ['firstName', 'lastName', 'email', 'phone']),
      mentor: pick(mentor, ['wasMentorBefore']),
      teacher: { school },
    };

    if (user.mentor || user.teacher) {
      initialValues.role = mentor ? 'mentor' : 'teacher';
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="title" align="center">
            Завершення реєстрації
          </Typography>
          <Typography variant="subheading" align="center">
            {initialValues.role && (
              <React.Fragment>
                {initialValues.role === 'mentor' ? 'Ментор' : 'Представник школи'}
                , будь
              </React.Fragment>
            )}
            {!initialValues.role && 'Будь'}
            &nbsp;ласка, введіть вірні дані
          </Typography>
          <CompleteSignUpForm
            initialValues={initialValues}
            // onSubmit={onCompleteSignUp}
            onSubmit={handleSubmit}
            schools={schools}
            schoolsLoading={schoolsFetching}
          />
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onCompleteSignUp: updateUser,
};

// export default connect(null, mapDispatchToProps)(withStyles(styles)(withAuth(Signup)));

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  // withUser,
  withSchools,
)(CompleteSignUp);
