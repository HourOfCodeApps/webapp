import React from 'react';
import Auth, { SignUp } from 'modules/Auth';
import { Container, Column, FlexBox } from 'styled/LayoutStyled';
import { Heading, HeadingSm } from 'styled/TypographyStyled';
import WelcomeHero from './components/WelcomeHero';

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
        <WelcomeHero />
        <Container container alignItems="center" marginCenter justify="space-between">
          <Column item xs={12} md={5}>
            {isSignInShown && (
              <React.Fragment>
                <Auth />
                <HeadingSm variant="subheading">
                  Ще не реєструвався? —
                  <span onClick={handleToggleMode}>Реєструйся</span>
                </HeadingSm>
              </React.Fragment>
            )}
            {!isSignInShown && (
              <React.Fragment>
                <SignUp />
                <HeadingSm variant="subheading">
                  Вже реєструвався? —
                  <span onClick={handleToggleMode}>Увійди</span>
                </HeadingSm>
              </React.Fragment>
            )}
          </Column>
          <Column item xs={12} md={5} withBar>
            <FlexBox column margin="0 0 20px 0">
              <Heading bolder>Ментор</Heading>
              <HeadingSm>Милий проактивний задрот, що мріє допомогти дітям войті в ІТ.</HeadingSm>
            </FlexBox>
            <FlexBox column margin="0 0 20px 0">
              <Heading bolder>Представник школи</Heading>
              <HeadingSm>Вчитель або інший працівник школи, що мріє про вільну годину серед робочого дня.</HeadingSm>
            </FlexBox>
            <FlexBox column>
              <Heading bolder>Є питання?</Heading>
              <HeadingSm link>Пиши на <span>hoflviv@gmail.com</span></HeadingSm>
            </FlexBox>
          </Column>
        </Container>
      </React.Fragment>
    );
  }
};

export default WelcomePage;

