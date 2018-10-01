import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SignupForm from '../../components/SignupForm';

import {
  signup,
} from '../../actions';

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

class Signup extends React.Component {
  static propTypes = {
    auth: PropTypes.shape(PropTypes.object).isRequired,
    classes: PropTypes.shape(PropTypes.object).isRequired,
    onSignup: PropTypes.func.isRequired,
  };

  handleSubmit = (formData) => {
    const { auth, onSignup } = this.props;
    const user = {
      phone: formData.phone,
      fullName: formData.fullName,
      email: formData.email,
      roles: {
        [formData.role]: true,
      },
      wasMentorBefore: Boolean(formData.wasMentorBefore),
      photoURL: auth.photoURL,
    };
    onSignup(user);
  }

  render() {
    const {
      handleSubmit,
      props: {
        auth,
        classes,
      },
    } = this;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <SignupForm
            initialValues={{
              fullName: auth.displayName,
              email: auth.email,
            }}
            onSubmit={handleSubmit}
          />
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSignup: signup,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Signup));
