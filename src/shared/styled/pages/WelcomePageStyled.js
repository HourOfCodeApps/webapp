import styled from 'styled-components';
import { colors } from '../styles';

export const WelcomeHeroWrapper = styled.div`
    padding: 40px 0 40px;
    position: relative;
    margin-bottom: 50px;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${colors.primary};
        opacity: .2;
    }
`;

export const Logo = styled.div`
    width: 100px;
    height: 100px;
    background-image: url('../src/shared/assets/img/hoc-logo.png');
    background-size: contain;
    margin-right: 10px;
`;