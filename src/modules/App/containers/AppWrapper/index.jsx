import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui-v3/core/styles';

import { signOut, withUser } from 'modules/Auth';

// import Drawer from '../../components/Drawer';
import Header from '../../components/Header';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflowX: 'auto',
    overflowY: 'scroll',
  },
});

const AppWrapper = ({
  children,
  classes,
  onSignOut,
  user,
}) => (
  <React.Fragment>
    <div className={classes.root}>
      <Header
        onSignOut={onSignOut}
        user={user}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  </React.Fragment>
);

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.object).isRequired,
};

const mapDispatchToProps = {
  onSignOut: signOut,
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withStyles(styles),
  withUser,
)(AppWrapper);
export { AppWrapper as AppWrapperComponent };
