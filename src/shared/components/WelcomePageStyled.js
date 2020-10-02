import styled from 'styled-components';
import withTheme from '@material-ui-v3/core/styles/withTheme';

import LogoImage from 'assets/img/hoc-logo.png';
import HomeBg from 'assets/img/home-bg.jpg';

export const WelcomeHeroWrapper = withTheme()(styled.div`
    padding-bottom: 40px;
    position: relative;
    margin-bottom: 50px;

    &:after, &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('${HomeBg}');
        background-size: cover;
        z-index: -1;
    }

    &:after {
      background-image: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    }
`);

export const Logo = styled.div`
    width: ${props => (props.width ? props.width : '60px')};
    height: ${props => (props.height ? props.height : '60px')};
    background-image: url('${LogoImage}');
    background-size: contain;
    margin-right: 10px;
`;
