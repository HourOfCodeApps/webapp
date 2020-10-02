import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withStyles } from '@material-ui-v3/core/styles';
import Button from '@material-ui-v3/core/Button';
import Dialog from '@material-ui-v3/core/Dialog';
import DialogActions from '@material-ui-v3/core/DialogActions';
import DialogContent from '@material-ui-v3/core/DialogContent';
import DialogContentText from '@material-ui-v3/core/DialogContentText';
import DialogTitle from '@material-ui-v3/core/DialogTitle';
import TextField from '@material-ui-v3/core/TextField';
import { HeadingSm } from 'shared/components/TypographyStyled';
import { FlexBox } from 'shared/components/LayoutStyled';
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

const styles = {
  wrapper: {
    minWidth: 650,
  },
  actions: {
    padding: '10px 30px 20px 10px',
    margin: '10px 0 0 0',
  },
  title: {
    padding: '24px 35px 15px',
  },
  content: {
    padding: '0 35px 0',
  },
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
        classes,
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
        classes={{ paper: classes.wrapper }}
      >
        <DialogTitle
          id="confirmation-dialog-title"
          classes={{ root: classes.title }}
        >
          Забули пароль?
        </DialogTitle>
        <DialogContent
          classes={{ root: classes.content }}
        >
          <DialogContentText>
            Для відновлення паролю будь ласка введіть Вашу поштову скриньку.
          </DialogContentText>
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
          {forgotPasswordInProgressError && (
            <FlexBox margin="5px 0 0 0">
              <HeadingSm error fontSize="14px">{forgotPasswordInProgressError.message}</HeadingSm>
            </FlexBox>
          )}
        </DialogContent>
        <DialogActions
          classes={{ root: classes.actions }}
        >
          <Button onClick={onCancel} color="primary" disabled={forgotPasswordInProgress}>
            Відміна
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="outlined"
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
  classes: PropTypes.shape(PropTypes.object).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ForgotPasswordDialog));
