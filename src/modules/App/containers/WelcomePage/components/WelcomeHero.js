import React from 'react';
import { Container, FlexBox } from 'styled/LayoutStyled';
import { Heading } from 'styled/TypographyStyled';

import { 
  WelcomeHeroWrapper, 
  WelcomeHeroHeading,
  Logo,
} from 'styled/pages/WelcomePageStyled';

const WelcomeHero = () => {

  return (
    <WelcomeHeroWrapper>
      <FlexBox margin="0 0 30px 30px" align="center"><Logo /><Heading bolder>Lviv</Heading></FlexBox>
      <Container alignItems="center" marginCenter>
        <Heading margin="0 0 25px 0" lineHeight="24px" fontSize="18px">
          Година Коду є глобальним заходом, який залучає 
          десятки мільйонів учнів<br /> у більш, як 180 країнах світу.
        </Heading>
        <Heading fontSize="18px">
          Більше інформації на <span>https://hourofcode.com/ua</span>
        </Heading>
      </Container>
    </WelcomeHeroWrapper>
  );
};

export default WelcomeHero;