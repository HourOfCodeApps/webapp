import React from 'react';
import PropTypes from 'prop-types';
import withTheme from '@material-ui/core/styles/withTheme';
import { Container, FlexBox } from 'shared/components/LayoutStyled';
import { Heading } from 'shared/components/TypographyStyled';

import {
  WelcomeHeroWrapper,
  Logo,
} from 'shared/components/WelcomePageStyled';

const WelcomeHero = props => (
  <WelcomeHeroWrapper>
    <FlexBox margin="0 0 30px 30px" align="center">
      <Logo />
      <Heading bolder color={props.theme.palette.common.white}>Lviv</Heading>
    </FlexBox>
    <Container alignItems="center" marginCenter>
      <Heading margin="0 0 25px 0" lineHeight="24px" fontSize="18px">
        Година коду - це глобальна ініціатива щодо популяризації програмування серед школярів усього світу, метою якої є показати учням, що інформатика може бути веселою та цікавою.
        <br />
        637,564,646 учнів вже спробували Годину коду!
      </Heading>
      <Heading link fontSize="18px">
        Більше інформації на&nbsp;
        <span><a href="https://hourofcode.com/ua/uk">https://hourofcode.com/ua/uk</a></span>
      </Heading>
    </Container>
  </WelcomeHeroWrapper>
);

WelcomeHero.propTypes = {
  theme: PropTypes.shape({ palette: PropTypes.object.isRequired }).isRequired,
};

export default withTheme()(WelcomeHero);
