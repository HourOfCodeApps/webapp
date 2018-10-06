import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import SignUpForm from '../../components/SignUpForm';

import {
  signUp,
} from '../../actions';

import {
  selectSigningUp,
  selectSigningUpError,
} from '../../selectors';

const styles = theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // height: '100vh',
    // width: '100%',
    // backgroundColor: theme.palette.background.default,
  },
});

class SignUp extends React.Component {
  static propTypes = {
    classes: PropTypes.shape(PropTypes.object).isRequired,
    onSignUp: PropTypes.func.isRequired,
    signingUp: PropTypes.bool.isRequired,
    signingUpError: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    signingUpError: null,
  }

  handleSubmit = ({
    email, password, role, wasMentorBefore,
  }) => {
    const { onSignUp } = this.props;
    onSignUp({
      email, password, role, wasMentorBefore,
    });
  }

  render() {
    const {
      handleSubmit,
      props: { classes, signingUp, signingUpError },
    } = this;

    return (
      <div className={classes.root}>
        <SignUpForm
          disabled={signingUp}
          onSubmit={handleSubmit}
          formError={signingUpError}
        />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectSigningUp(),
  selectSigningUpError(),
  (
    signingUp,
    signingUpError,
  ) => ({
    signingUp,
    signingUpError,
  }),
);

const mapDispatchToProps = {
  onSignUp: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
