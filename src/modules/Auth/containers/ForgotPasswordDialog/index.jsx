import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';


import isEmail from 'shared/utils/validations/isEmail';

import {
  forgotPassword,
} from '../../actions';

import {
  selectForgotPasswordInProgress,
  selectForgotPasswordInProgressError,
} from '../../selectors';

const validateEmail = (email) => {
  if (!email.trim()) {
    return 'Required';
  }

  if (!isEmail(email)) {
    return 'Email is invalid';
  }

  return null;
};

class ForgotPasswordDialog extends React.Component {
  state = {
    email: '',
    errors: {},
  };

  componentDidUpdate(prevProps) {
    if (prevProps.forgotPasswordInProgress && !this.props.forgotPasswordInProgress) {
      if (this.props.forgotPasswordInProgressError) {
        toast.error(this.props.forgotPasswordInProgressError.message);
      } else {
        toast.success('Лист про відновлення паролю надіслано');
        this.props.onClose();
      }
    }
  }

  handleConfirm = () => {
    this.props.onForgotPassword(this.state.email);
  };

  handleEmailChange = ({ target }) => {
    const email = target.value;
    this.setState(state => ({
      email,
      errors: {
        ...state.errors,
        email: validateEmail(email),
      },
    }));
  }

  render() {
    const {
      handleConfirm,
      handleEmailChange,
      props: {
        forgotPasswordInProgress,
        forgotPasswordInProgressError,
        onCancel,
        onClose,
      },
      state: { email, errors },
    } = this;

    return (
      <Dialog
        open
        onClose={onClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Відновлення паролю</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            variant="outlined"
            helperText={errors.email || ''}
            fullWidth
            error={errors.email}
            disabled={forgotPasswordInProgress}
            label="Поштова скринька"
            onChange={handleEmailChange}
            value={email}
            autoFocus
          />
          {forgotPasswordInProgressError && <div>{forgotPasswordInProgressError.message}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary" disabled={forgotPasswordInProgress}>
            Відміна
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            disabled={!email.trim() || errors.email || forgotPasswordInProgress}
          >
            Відновити пароль
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ForgotPasswordDialog.propTypes = {
  forgotPasswordInProgress: PropTypes.bool.isRequired,
  forgotPasswordInProgressError: PropTypes.instanceOf(Object),
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};

ForgotPasswordDialog.defaultProps = {
  forgotPasswordInProgressError: null,
};

const mapStateToProps = createSelector(
  selectForgotPasswordInProgress(),
  selectForgotPasswordInProgressError(),
  (
    forgotPasswordInProgress, forgotPasswordInProgressError,
  ) => ({
    forgotPasswordInProgress, forgotPasswordInProgressError,
  }),
);

const mapDispatchToProps = {
  onForgotPassword: forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordDialog);
