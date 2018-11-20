import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '150px',
    height: '100%',
    width: '100%',
    userSelect: 'none',
    // backgroundColor: theme.palette.background.default,
  },
};

const AppLoading = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress size={100} />
  </div>
);

AppLoading.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(AppLoading);
