import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  selectMe,
  selectMeFetching,
  selectMeFetchingError,
} from './selectors';

import ProfileForm from './components/ProfileForm';
import { fetchMe } from './actions';

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

class Profile extends React.Component {
  componentDidMount() {
    this.props.onFetchMe();
  }
  // handleGoogleLogin = () => {
  //   const { onSignIn } = this.props;
  //   onSignIn(SIGNIN_GOOGLE_PROVIDER);
  // };

  // handleEmailPasswordLogin = (formData) => {
  //   // console.log(formData);
  //   const { onSignIn } = this.props;
  //   onSignIn(SIGNIN_EMAILPASSWORD_PROVIDER, {
  //     email: formData.email,
  //     password: formData.password,
  //   });
  // }

  // handleSignUp = () => {

  // };

  render() {
    const {
      handleEmailPasswordLogin,
      handleGoogleLogin,
      handleSignUp,
      props: { classes, me, meFetching, meFetchingError },
    } = this;

    return (
      // <div className={classes.root1}>
      <div>
        {meFetchingError && (
          <Typography variant="caption" gutterBottom style={{ color: 'red' }}>{meFetchingError.message}</Typography>
        )}
        <div style={{ maxWidth: 600 }}>
          <ProfileForm
            initialValues={me}
            // disabled={signingIn}
            // onSignUp={handleSignUp}
            // onSubmit={handleEmailPasswordLogin}
          />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onSignIn: PropTypes.func.isRequired,
  signingIn: PropTypes.bool.isRequired,
  signingInError: PropTypes.instanceOf(Object),
};

Profile.defaultProps = {
  signingInError: null,
};

const mapStateToProps = createSelector(
  selectMe(),
  selectMeFetching(),
  selectMeFetchingError(),
  (
    me, meFetching, meFetchingError,
  ) => ({
    me, meFetching, meFetchingError,
  }),
);

const mapDispatchToProps = {
  onFetchMe: fetchMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
