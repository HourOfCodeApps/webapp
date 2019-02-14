// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Application
import { FlexBox } from 'shared/components/LayoutStyled';
import { HeadingSm } from 'shared/components/TypographyStyled';

import {
  forgotPassword,
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

import SigninForm from '../../components/SigninForm';
import ForgotPasswordDialog from '../ForgotPasswordDialog';

class SignIn extends React.Component {
  static propTypes = {
    onForgotPassword: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired,
    signingIn: PropTypes.bool.isRequired,
    signingInError: PropTypes.instanceOf(Object),
    theme: PropTypes.shape({ palette: PropTypes.object.isRequired }).isRequired,
  };

  static defaultProps = {
    signingInError: null,
  };

  state = {
    showForgotPasswordDialog: false,
  }

  handleGoogleLogin = () => {
    const { onSignIn } = this.props;
    onSignIn(SIGNIN_GOOGLE_PROVIDER);
  };

  handleEmailPasswordLogin = (formData) => {
    const { onSignIn } = this.props;
    onSignIn(SIGNIN_EMAILPASSWORD_PROVIDER, {
      email: formData.email,
      password: formData.password,
    });
  }

  handleSignUp = () => {

  };

  handleForgotPassword = () => this.setState({ showForgotPasswordDialog: true });

  handleForgotPasswordCancel = () => this.setState({ showForgotPasswordDialog: false });

  render() {
    const {
      handleEmailPasswordLogin,
      handleForgotPassword,
      handleForgotPasswordCancel,
      handleGoogleLogin,
      handleSignUp,
      props: { signingIn, signingInError, theme },
      state: { showForgotPasswordDialog },
    } = this;

    return (
      <React.Fragment>
        <FlexBox column align="center" justify="center">
          {signingInError && (
            <Typography variant="caption" gutterBottom style={{ color: 'red' }}>{signingInError.message}</Typography>
          )}
          <SigninForm
            disabled={signingIn}
            onSignUp={handleSignUp}
            onSubmit={handleEmailPasswordLogin}
          />
          {/* <FlexBox margin="15px 0 0 0" width="100%">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGoogleLogin}
            >
              Увійти з Google
            </Button>
          </FlexBox> */}
          <FlexBox margin="10px 0 20px 0" width="100%">
            <HeadingSm
              onClick={handleForgotPassword}
              fontSize="14px"
              color={theme.palette.primary.main}
              pointer
            >
              Забули пароль?
            </HeadingSm>
          </FlexBox>
        </FlexBox>
        {showForgotPasswordDialog && (
          <ForgotPasswordDialog
            onCancel={handleForgotPasswordCancel}
            onClose={handleForgotPasswordCancel}
          />
        )}
      </React.Fragment>
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
  onForgotPassword: forgotPassword,
  onSignIn: signIn,
};


export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(SignIn));
