import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {
  login,
} from './actions';

import { selectUser } from './selectors';

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
  root1: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // height: '100vh',
    // width: '100%',
    // backgroundColor: theme.palette.background.default,
  },
  button: {
    margin: theme.spacing.unit,
    width: '200px',
  },
});

const Auth = ({ classes, onLogin }) => (
  // <div className={classes.root}>
  <div className={classes.root1}>
    <Button variant="contained" color="primary" className={classes.button} onClick={onLogin}>Login with Google</Button>
  </div>
);

Auth.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  selectUser(),
  user => ({ user }),
);

const mapDispatchToProps = {
  onLogin: login,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));
