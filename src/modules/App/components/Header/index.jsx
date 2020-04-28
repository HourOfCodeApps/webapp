import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import { FlexBox } from 'shared/components/LayoutStyled';
import { Heading } from 'shared/components/TypographyStyled';
import { Logo } from 'shared/components/WelcomePageStyled';

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
  logo: theme.palette.common.white,
});

const Header = ({ classes, onSignOut, user }) => (
  <AppBar
    position="absolute"
    className={classes.appBar}
  >
    <Container>
    <Toolbar className={classes.toolbar}>
      <Typography variant="title" color="inherit" className={classes.title} component={RouterLink} to="/">
        <FlexBox margin="10px 0px" align="center">
          <Logo width="60px" height="60px" />
          <Heading bolder color={classes.logo}>Lviv</Heading>
        </FlexBox>
      </Typography>
      <FlexBox>
        {user.admin && (
          <React.Fragment>
            <Button
              color="inherit"
              size="large"
              component={RouterLink}
              to="/schools"
            >
              Школи
            </Button>
            <Button
              color="inherit"
              size="large"
              component={RouterLink}
              to="/teachers"
            >
              Вчителі
            </Button>
            <Button
              color="inherit"
              size="large"
              component={RouterLink}
              to="/mentors"
            >
              Ментори
            </Button>
            <Button
              color="inherit"
              size="large"
              component={RouterLink}
              to="/timeslots"
            >
              Уроки
            </Button>
          </React.Fragment>
        )}
        {user.teacher && (
          <Button
            color="inherit"
            size="large"
            component={RouterLink}
            to="/"
          >
            Розклад
          </Button>
        )}
        <Button
          color="inherit"
          size="large"
          component={RouterLink}
          to="/me"
        >
          Мої дані
        </Button>
        <Button
          color="inherit"
          size="large"
          onClick={onSignOut}
        >
          Вихід
        </Button>
      </FlexBox>
    </Toolbar>
    </Container>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.object).isRequired,
};

export default withStyles(styles)(Header);
