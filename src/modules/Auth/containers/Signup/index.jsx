import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import SignUpForm from '../../components/SignUpForm';

import {
  signUp,
} from '../../actions';

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
  };

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
      props: { classes },
    } = this;

    return (
      <div className={classes.root}>
        <SignUpForm
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSignUp: signUp,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignUp));
