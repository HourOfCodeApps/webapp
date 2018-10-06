import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  toolbarButton: {
    color: 'white',
  },
});

const Header = ({ classes, onSignOut }) => (
  <AppBar
    position="absolute"
    className={classes.appBar}
  >
    <Toolbar className={classes.toolbar}>
      <Typography variant="title" color="inherit" className={classes.title} component={props => <Link to="/" {...props} />}>
        HOC Organizer
      </Typography>

      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {/* {user.roles.mentor && (<Button className={classes.toolbarButton}>Mentor Tools</Button>)} */}
      {/* {user.roles.teacher && (<Button className={classes.toolbarButton}>Teacher Tools</Button>)} */}
      {/* {user.roles.admin && (
        <Button
          className={classes.toolbarButton}
          component={props => <Link to="/users" {...props} />}
        >
          Користувачі
        </Button>
      )} */}
      <Button
        className={classes.toolbarButton}
        component={props => <Link to="/schedule" {...props} />}
      >
        Розклад
      </Button>
      <Button
        className={classes.toolbarButton}
        component={props => <Link to="/me" {...props} />}
      >
        Мої дані
      </Button>
      <Button
        className={classes.toolbarButton}
        onClick={onSignOut}
      >
        Вихід
      </Button>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.object).isRequired,
};

export default withStyles(styles)(Header);
