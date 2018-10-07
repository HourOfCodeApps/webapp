import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Auth, { SignUp } from 'modules/Auth';
import { colors } from 'theme';
import { Container, Column } from 'styled/LayoutStyled';

const styles = {
  root: {
    maxWidth: 940, 
    margin: '0 auto',
    height: '100vh'
  },
  title: {
    color: colors.dark,
    fontWeight: 600,
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

class WelcomePage extends React.Component {
  state = {
    isSignInShown: false,
  };
  

  handleToggleMode = () => this.setState(({ isSignInShown }) => ({ isSignInShown: !isSignInShown }));
  render() {
    const {
      handleToggleMode,
      props: { classes },
      state: { isSignInShown },
    } = this;

    return (
      <React.Fragment>
        <Container container alignItems="center" justify="space-between" spacing={40} className={classes.root}>
          <Column item xs={12} md={5}>
            {isSignInShown && (
              <React.Fragment>
                <Auth />
                <Typography variant="subheading">
                  Ще не реєструвався? —
                  <span onClick={handleToggleMode} className={classes.link}>Реєструйся</span>
                </Typography>
              </React.Fragment>
            )}
            {!isSignInShown && (
              <React.Fragment>
                <SignUp />
                <Typography variant="subheading">
                  Вже реєструвався? —
                  <span onClick={handleToggleMode} className={classes.link}>Увійди</span>
                </Typography>
              </React.Fragment>
            )}
          </Column>
          <Column item xs={12} md={5} withBar>
            <Typography variant="headline" className={classes.title}>
              Ментор
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Милий проактивний задрот, що мріє допомогти дітям войті в ІТ.
            </Typography>
            <Typography variant="headline" className={classes.title}>
              Представник школи
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Вчитель або інший працівник школи, що мріє про вільну годину серед робочого дня.
            </Typography>
            <Typography variant="headline" className={classes.title}>
              Є питання?
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Пиши на hoflviv@gmail.com
            </Typography>
          </Column>
        </Container>
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(WelcomePage);

