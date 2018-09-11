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
    backgroundColor: 'rgb(30, 170, 185)',
    color: 'white',
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
    width: '200px',
  },
});

const Auth = ({ classes, onLogin }) => (
  <div className={classes.root}>
    <Button className={classes.button} onClick={onLogin}>Login with Google</Button>
    <Button className={classes.button} disabled>Login with Facebook</Button>
    <Button className={classes.button} disabled>Login with Phone</Button>
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