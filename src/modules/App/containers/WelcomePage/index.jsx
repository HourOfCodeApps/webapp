import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import Auth, { SignUp } from 'modules/Auth';

class WelcomePage extends React.Component {
  state = {
    isSignInShown: false,
  };

  handleToggleMode = () => this.setState(({ isSignInShown }) => ({ isSignInShown: !isSignInShown }));

  render() {
    const {
      handleToggleMode,
      state: { isSignInShown },
    } = this;

    return (
      <React.Fragment>
        <div>Welcome</div>
        <Grid container spacing={40} style={{ maxWidth: 940, margin: '0 auto' }}>
          <Grid item xs={12} md={6}>
            {isSignInShown && (
              <React.Fragment>
                <Auth />
                <Typography variant="subheading">
                  Ще не реєструвався? —
                  <span onClick={handleToggleMode} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Реєструйся</span>
                </Typography>
              </React.Fragment>

            )}
            {!isSignInShown && (
              <React.Fragment>
                <SignUp />
                <Typography variant="subheading">
                  Вже реєструвався? —
                  <span onClick={handleToggleMode} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Увійди</span>
                </Typography>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="display1">
              Ментор
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Милий проактивний задрот, що мріє допомогти дітям войті в ІТ.
            </Typography>

            <Typography variant="display1">
              Представник школи
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Вчитель або інший працівник школи, що мріє про вільну годину серед робочого дня.
            </Typography>

            <Typography variant="display1">
              Є питання?
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Пиши на hoflviv@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export default WelcomePage;
