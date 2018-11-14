import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loading from 'shared/components/Loading';

const ConfirmationDialog = ({
  cancelLabel, confirmLabel, description, loading, onCancel, onConfirm, title,
}) => (
  <Dialog
    open
    onClose={onCancel}
    aria-labelledby="confirmation-dialog-title"
    aria-describedby="confirmation-dialog-description"
    disableBackdropClick={loading}
    disableEscapeKeyDown={loading}
  >
    <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
    {!loading && (
      <React.Fragment>
        {!!description && (
          <DialogContent>
            <DialogContentText id="confirmation-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            {confirmLabel}
          </Button>
        </DialogActions>
      </React.Fragment>
    )}
    {loading && (
      <DialogContent>
        <Loading />
      </DialogContent>
    )}
  </Dialog>
);

ConfirmationDialog.propTypes = {
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  loading: PropTypes.bool,
};

ConfirmationDialog.defaultProps = {
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  title: 'Are you sure?',
  description: '',
  loading: false,
};

export default ConfirmationDialog;
