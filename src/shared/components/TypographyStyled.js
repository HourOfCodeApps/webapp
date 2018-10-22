import styled from 'styled-components';

export const Heading = styled.div`
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    margin: ${props => (props.margin ? props.margin : 0)};
    font-size: ${props => (props.fontSize ? props.fontSize : '24px')};
    font-weight: ${props => (props.bolder ? 600 : 400)};
    color: ${props => props.color};
    line-height: ${props => props.lineHeight};

    ${props => props.halfLine && `
        padding-bottom: 3px;
        position: relative;
        display: table;

        &:before {
            content: "";
            bottom: 0;
            left: 0;
            position: absolute;
            height: 3px;
            width: 35%;
            background: ${props.color};
        }
    `}

    ${props => props.link && `
        span {
            cursor: pointer;
            position: relative;
            padding-bottom: 2px;

            &:before {
                content: "";
                bottom: 0;
                left: 0;
                position: absolute;
                height: 2px;
                width: 100%;
                background: ${props.color};
            }
        }
    `}
`;

export const HeadingSm = styled(Heading)`
    font-size: 16px;
`;
