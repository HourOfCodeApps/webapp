import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FlexBox } from 'shared/components/LayoutStyled';
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
      props: { signingIn, signingInError },
    } = this;

    return (
      <FlexBox column align="center" justify="center">
        {signingInError && (
          <Typography variant="caption" gutterBottom style={{ color: 'red' }}>{signingInError.message}</Typography>
        )}
        <SigninForm
          disabled={signingIn}
          onSignUp={handleSignUp}
          onSubmit={handleEmailPasswordLogin}
        />
        <FlexBox margin="15px 0 20px 0" width="100%">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleGoogleLogin}
          >
          Увійти з Google
          </Button>
        </FlexBox>
      </FlexBox>
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


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
