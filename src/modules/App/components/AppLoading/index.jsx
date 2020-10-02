import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui-v3/core/CircularProgress';
import { withStyles } from '@material-ui-v3/core/styles';

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
});

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
