import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui-v3/core/Button';
import Dialog from '@material-ui-v3/core/Dialog';
import DialogActions from '@material-ui-v3/core/DialogActions';
import DialogContent from '@material-ui-v3/core/DialogContent';
import DialogContentText from '@material-ui-v3/core/DialogContentText';
import DialogTitle from '@material-ui-v3/core/DialogTitle';
import red from '@material-ui-v3/core/colors/red';
import MuiThemeProvider from '@material-ui-v3/core/styles/MuiThemeProvider';
import withStyles from '@material-ui-v3/core/styles/withStyles';
import TextField from '@material-ui-v3/core/TextField';

import Loading from 'shared/components/Loading';

const dangerTheme = outerTheme => ({
  ...outerTheme,
  palette: {
    ...outerTheme.palette,
    primary:
    {
      ...outerTheme.palette.primary,
      main: red[500],
    },
  },
});

const defaultTheme = outerTheme => outerTheme;

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

class ConfirmationDialog extends React.Component {
  state = {
    answer: '',
    error: '',
  };

  handleAnswerChange = ({ target }) => {
    const answer = target.value;
    this.setState({
      answer,
      error: answer.trim() ? '' : 'Обов\'язкове поле',
    });
  }

  handleConfirm = () => {
    if (this.props.question) {
      this.props.onConfirm(this.state.answer);
    } else {
      this.props.onConfirm();
    }
  }

  render() {
    const {
      handleAnswerChange,
      handleConfirm,
      props: {
        cancelLabel, confirmLabel, description, loading, onCancel, title,
        question, classes,
        danger,
      },
      state: { answer, error },
    } = this;

    return (
      <MuiThemeProvider theme={danger ? dangerTheme : defaultTheme}>
        <Dialog
          open
          onClose={onCancel}
          aria-labelledby="confirmation-dialog-title"
          aria-describedby="confirmation-dialog-description"
          disableBackdropClick={loading}
          disableEscapeKeyDown={loading}
          classes={{ paper: classes.wrapper }}
        >
          <DialogTitle id="confirmation-dialog-title" classes={{ root: classes.title }}>{title}</DialogTitle>
          {!loading && (
            <React.Fragment>
              {(!!description || !!question) && (
                <DialogContent classes={{ root: classes.content }}>
                  {!!description && (
                    <DialogContentText id="confirmation-dialog-description">
                      {description}
                    </DialogContentText>
                  )}
                  {!!question && (
                    <React.Fragment>
                      <DialogContentText>
                        {question}
                      </DialogContentText>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        helperText={error || ''}
                        fullWidth
                        error={error}
                        label="Причина"
                        onChange={handleAnswerChange}
                        value={answer}
                        autoFocus
                      />
                    </React.Fragment>
                  )}
                </DialogContent>
              )}
              <DialogActions>
                <Button onClick={onCancel} color="primary">
                  {cancelLabel}
                </Button>
                <Button
                  onClick={handleConfirm}
                  color="primary"
                  autoFocus
                  disabled={question && (!answer.trim() || error)}
                >
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
      </MuiThemeProvider>
    );
  }
}

ConfirmationDialog.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  loading: PropTypes.bool,
  question: PropTypes.string,
  danger: PropTypes.bool,
};

ConfirmationDialog.defaultProps = {
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  title: 'Are you sure?',
  description: '',
  loading: false,
  question: null,
  danger: false,
};

export default withStyles(styles)(ConfirmationDialog);
