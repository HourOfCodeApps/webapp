import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { logout, withUser } from 'modules/Auth';

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
    overflow: 'auto',
  },
});

class AppWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    classes: PropTypes.shape(PropTypes.object).isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.shape(PropTypes.object).isRequired,
  }

  render() {
    const {
      props: {
        children,
        classes,
        onLogout,
        user,
      },
    } = this;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Header
            onLogout={onLogout}
            user={user}
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  onLogout: logout,
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withStyles(styles),
  withUser,
)(AppWrapper);
export { AppWrapper as AppWrapperComponent };
