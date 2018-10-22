import styled from 'styled-components';

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
        background-color: ${props => props.bgColor};
        opacity: .2;
    }
`;

export const Logo = styled.div`
    width: ${props => (props.width ? props.width : '100px')};
    height: ${props => (props.height ? props.height : '100px')};
    background-image: url('../src/shared/assets/img/hoc-logo.png');
    background-size: contain;
    margin-right: 10px;
`;
