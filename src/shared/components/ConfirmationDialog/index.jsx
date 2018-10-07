import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = ({
  cancelLabel, confirmLabel, description, onCancel, onConfirm, title,
}) => (
  <Dialog
    open
    onClose={onCancel}
    aria-labelledby="confirmation-dialog-title"
    aria-describedby="confirmation-dialog-description"
  >
    <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
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
  </Dialog>
);

ConfirmationDialog.propTypes = {
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ConfirmationDialog.defaultProps = {
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  title: 'Are you sure?',
  description: '',
};

export default ConfirmationDialog;
