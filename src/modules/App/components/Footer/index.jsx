import React from 'react';
import PropTypes from 'prop-types';
import { withTheme, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { HeadingSm } from 'shared/components/TypographyStyled';

const styles = theme => ({
  root: {
    height: '65px',
    padding: '10px 25px',
    alignItems: 'center',
    justifyContent: 'initial',
    background: theme.palette.grey[800],
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginLeft: '35px',
  },
});

const Footer = ({ classes, theme }) => (
  <BottomNavigation className={classes.root}>
    <HeadingSm color={theme.palette.grey[300]}>&#169; Hour of Code Lviv 2018</HeadingSm>
    <HeadingSm><a className={classes.link} href="http://hoflviv@gmail.com">hoflviv@gmail.com</a></HeadingSm>
  </BottomNavigation>
);

Footer.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  theme: PropTypes.shape({ palette: PropTypes.object.isRequired }).isRequired,
};

export default withTheme()(withStyles(styles)(Footer));
