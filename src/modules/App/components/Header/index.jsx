import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FlexBox } from 'shared/components/LayoutStyled';
import { Heading } from 'shared/components/TypographyStyled';
import { Logo } from 'shared/components/WelcomePageStyled';

const styles = theme => ({
  toolbar: {
    '& > *': {
      margin: theme.spacing(0, 1),
      '&:first-child': {
        marginLeft: 0,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    '& > img': {
      display: 'block',
    },
  },
  logo: theme.palette.common.white,
});

const Header = ({ classes, onSignOut, user }) => (
  <AppBar
    position="absolute"
    className={classes.appBar}
  >
    <Container>
      <Toolbar className={classes.toolbar} disableGutters>
        <div className={classes.title}>
          <Typography variant="h6" color="inherit" className={classes.title} component={RouterLink} to="/">
            <FlexBox margin="10px 0px" align="center">
              <Logo width="60px" height="60px" />
              <Heading bolder color={classes.logo}>Lviv</Heading>
            </FlexBox>
          </Typography>
        </div>

        {user.admin && (
          <>
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
          </>
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
