import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  toolbar: {
    paddingRight: 24,
    justifyContent: 'space-between',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    textDecoration: 'none',
  },
  toolbarButton: {
    color: 'white',
  },
});

const Header = ({ classes, onSignOut, user }) => (
  <AppBar
    position="absolute"
    className={classes.appBar}
  >
    <Toolbar className={classes.toolbar}>
      <Typography variant="title" color="inherit" className={classes.title} component={props => <Link to="/" {...props} />}>
        <FlexBox margin="10px 0px" align="center">
          <Logo width="60px" height="60px" />
          <Heading bolder>Lviv</Heading>
        </FlexBox>
      </Typography>

      {/* <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton> */}
      {/* {user.mentor && (<Button className={classes.toolbarButton}>Mentor Tools</Button>)} */}
      {/* {user.teacher && (<Button className={classes.toolbarButton}>Teacher Tools</Button>)} */}
      {/* {user.admin && (
        <Button
          className={classes.toolbarButton}
          component={props => <Link to="/me" {...props} />}
        >
          Мої дані
        </Button>
      )} */}
      {user.admin && (
        <React.Fragment>
          <Button
            className={classes.toolbarButton}
            component={props => <Link to="/schools" {...props} />}
          >
            Школи
          </Button>
          <Button
            className={classes.toolbarButton}
            component={props => <Link to="/teachers" {...props} />}
          >
            Вчителі
          </Button>
        </React.Fragment>
      )}
      {user.teacher && (
        <Button
          className={classes.toolbarButton}
          component={props => <Link to="/" {...props} />}
        >
          Розклад
        </Button>
      )}
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
