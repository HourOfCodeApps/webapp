import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  signIn,
} from '../../actions';

import {
  selectUser,
  selectSigningIn,
  selectSigningInError,
} from '../../selectors';

import {
  SIGNIN_EMAILPASSWORD_PROVIDER,
  SIGNIN_GOOGLE_PROVIDER,
} from '../../constants';

import SigninForm from '../../components/SignInForm';

const styles = theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});

class SignIn extends React.Component {
  static propTypes = {
    classes: PropTypes.shape(PropTypes.object).isRequired,
    onSignIn: PropTypes.func.isRequired,
    signingIn: PropTypes.bool.isRequired,
    signingInError: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    signingInError: null,
  };

  handleGoogleLogin = () => {
    const { onSignIn } = this.props;
    onSignIn(SIGNIN_GOOGLE_PROVIDER);
  };

  handleEmailPasswordLogin = (formData) => {
    // console.log(formData);
    const { onSignIn } = this.props;
    onSignIn(SIGNIN_EMAILPASSWORD_PROVIDER, {
      email: formData.email,
      password: formData.password,
    });
  }

  handleSignUp = () => {

  };

  render() {
    const {
      handleEmailPasswordLogin,
      handleGoogleLogin,
      handleSignUp,
      props: { classes, signingIn, signingInError },
    } = this;

    return (
      <div className={classes.root1}>
        {signingInError && (
          <Typography variant="caption" gutterBottom style={{ color: 'red' }}>{signingInError.message}</Typography>
        )}
        <SigninForm
          disabled={signingIn}
          onSignUp={handleSignUp}
          onSubmit={handleEmailPasswordLogin}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleGoogleLogin}
        >
          Увійти з Google
        </Button>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectSigningIn(),
  selectSigningInError(),
  selectUser(),
  (
    signingIn, signingInError, user,
  ) => ({
    signingIn, signingInError, user,
  }),
);

const mapDispatchToProps = {
  onSignIn: signIn,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));