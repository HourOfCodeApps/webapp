import React from 'react';
import Auth, { SignUp } from 'modules/Auth';
import { Container, Column, FlexBox } from 'shared/components/LayoutStyled';
import { Heading, HeadingSm } from 'shared/components/TypographyStyled';

import { withConfig } from 'modules/Config';

import WelcomeHero from './components/WelcomeHero';

class WelcomePage extends React.Component {
  state = {
    isSignInShown: false,
  };


  handleToggleMode = () => {
    this.setState(({ isSignInShown }) => ({ isSignInShown: !isSignInShown }));
  }

  render() {
    const {
      handleToggleMode,
      state: { isSignInShown },
      props: { config },
    } = this;

    const signupEnabled = config.mentorSignupEnabled || config.teacherSignupEnabled;

    return (
      <React.Fragment>
        <WelcomeHero />
        <Container container alignItems="center" marginCenter justify="space-between">
          <Column item xs={12} md={5}>
            {(isSignInShown || !signupEnabled) && (
              <FlexBox margin="0 0 50px 0" align="center" justify="center">
                <Auth />
                {signupEnabled && (
                  <HeadingSm variant="subheading" link>
                    Ще не реєструвався? —
                    <span onClick={handleToggleMode}>Реєструйся</span>
                  </HeadingSm>
                )}
              </FlexBox>
            )}
            {!isSignInShown && signupEnabled && (
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
                представник сфери ІТ, охочий розповісти школярам про свою професію та обовязки:
                бізнес-аналітики, програмісти, тестувальники, проектні менеджери, HR, рекрутери та інші.
                <br />
                Стань ментором і ти!
              </HeadingSm>
            </FlexBox>
            <FlexBox column margin="0 0 20px 0">
              <Heading bolder margin="0 0 5px 0">Представник школи</Heading>
              <HeadingSm>
                контактна особа школи, котра відповідає за проведення Години коду у конкретній школі (наприклад, вчитель інформатики).
              </HeadingSm>
            </FlexBox>
            <FlexBox column>
              <Heading bolder margin="0 0 5px 0">Є питання?</Heading>
              <HeadingSm link>
                Пиши на&nbsp;
                <span><a href="mailto:hourofcodelviv@gmail.com">hourofcodelviv@gmail.com</a></span>
              </HeadingSm>
            </FlexBox>
          </Column>
        </Container>
      </React.Fragment>
    );
  }
}

export default withConfig(WelcomePage);
export { WelcomePage as WelcomePageComponent };
