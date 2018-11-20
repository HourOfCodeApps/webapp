import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from '@material-ui/core/Modal';

import Loading from 'shared/components/Loading';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 150,
    padding: theme.spacing.unit * 4,
    left: '50vw',
    top: '50vh',
    marginLeft: -75,
    marginTop: -75,
  //   -webkit-user-select: none;  /* Chrome all / Safari all */
  // -moz-user-select: none;     /* Firefox all */
  // -ms-user-select: none;      /* IE 10+ */
    userSelect: 'none',
    outlineStyle: 'none',
  },
});

const LoadingOverlay = ({ classes }) => (
  <Modal
    disableBackdropClick
    disableEscapeKeyDown
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open
  >
    <div className={classes.paper}>
      <Loading />
    </div>
  </Modal>
);

export default withStyles(styles)(LoadingOverlay);
