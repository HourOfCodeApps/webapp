import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { useAuth } from 'modules/Auth';
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
}) => {
  const { user, signOut } = useAuth();

  return (
    <>
      <div className={classes.root}>
        <Header
          onSignOut={signOut}
          user={user}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    </>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  classes: PropTypes.shape(PropTypes.object).isRequired,
};


export default withStyles(styles)(AppWrapper);
export { AppWrapper as AppWrapperComponent };
