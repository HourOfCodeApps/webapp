import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import SignUpForm from '../../components/SignUpForm';
import { FlexBox } from 'shared/components/LayoutStyled';

import {
  signUp,
} from '../../actions';

import {
  selectSigningUp,
  selectSigningUpError,
} from '../../selectors';

class SignUp extends React.Component {
  static propTypes = {
    onSignUp: PropTypes.func.isRequired,
    signingUp: PropTypes.bool.isRequired,
    signingUpError: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    signingUpError: null,
  }

  handleSubmit = ({
    email, password, role, wasMentorBefore, policyAgreed,
  }) => {
    const { onSignUp } = this.props;
    onSignUp({
      email, password, role, wasMentorBefore, policyAgreed,
    });
  }

  render() {
    const {
      handleSubmit,
      props: { signingUp, signingUpError },
    } = this;

    return (
      <FlexBox column align="center" justify="center">
        <SignUpForm
          disabled={signingUp}
          onSubmit={handleSubmit}
          formError={signingUpError}
        />
      </FlexBox>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
