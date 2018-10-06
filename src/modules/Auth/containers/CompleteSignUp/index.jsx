import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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


  // handleSubmit = (formData) => {
  //   const { onCompleteSignUp } = this.props;
  //   const userData = {
  //     email: formData.email,
  //     firstName: formData.firstName,
  //     lastName: formData.lastName,
  //     phone: formData.phone,
  //     roles: {
  //       [formData.role]: true,
  //     },
  //     wasMentorBefore: Boolean(formData.wasMentorBefore),
  //   };
  //   onCompleteSignUp(userData);
  // }

  render() {
    const {
      handleSubmit,
      props: {
        onCompleteSignUp,
        auth,
        classes,
        schools,
        schoolsFetching,
        user,
      },
    } = this;

    const initialValues = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      wasMentorBefore: user.wasMentorBefore,
    };

    if (user && user.roles) {
      initialValues.role = user.roles.teacher ? 'teacher' : 'mentor';
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div>
            Завершення реєстрації — Представник школи
            Будь ласка, введи вірні дані
          </div>
          <CompleteSignUpForm
            initialValues={initialValues}
            onSubmit={onCompleteSignUp}
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
