import React from 'react';
import Auth, { SignUp } from 'modules/Auth';
import { Container, Column, FlexBox } from 'shared/components/LayoutStyled';
import { Heading, HeadingSm } from 'shared/components/TypographyStyled';
import WelcomeHero from './components/WelcomeHero';

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
        <WelcomeHero />
        <Container container alignItems="center" marginCenter justify="space-between">
          <Column item xs={12} md={5}>
            {isSignInShown && (
              <FlexBox margin="0 0 50px 0" align="center" justify="center">
                <Auth />
                <HeadingSm variant="subheading" link>
                  Ще не реєструвався? —
                  <span onClick={handleToggleMode}>Реєструйся</span>
                </HeadingSm>
              </FlexBox>
            )}
            {!isSignInShown && (
              <FlexBox margin="0 0 50px 0" align="center" justify="center">
                <SignUp />
                <HeadingSm variant="subheading" link>
                  Вже реєструвався? —
                  <span onClick={handleToggleMode}>Увійди</span>
                </HeadingSm>
              </FlexBox>
            )}
          </Column>
          <Column item xs={12} md={5} withBar>
            <FlexBox column margin="0 0 20px 0">
              <Heading bolder margin="0 0 5px 0">Ментор</Heading>
              <HeadingSm>
                Милий проактивний задрот, що мріє
                допомогти дітям войті в ІТ.
              </HeadingSm>
            </FlexBox>
            <FlexBox column margin="0 0 20px 0">
              <Heading bolder margin="0 0 5px 0">Представник школи</Heading>
              <HeadingSm>
                Вчитель або інший працівник школи, що мріє про вільну
                годину серед робочого дня.
              </HeadingSm>
            </FlexBox>
            <FlexBox column>
              <Heading bolder margin="0 0 5px 0">Є питання?</Heading>
              <HeadingSm link>
                Пиши на&nbsp;
                <span>hoflviv@gmail.com</span>
              </HeadingSm>
            </FlexBox>
          </Column>
        </Container>
      </React.Fragment>
    );
  }
}

export default WelcomePage;
