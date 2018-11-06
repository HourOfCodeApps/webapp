import styled from 'styled-components';
import withTheme from '@material-ui/core/styles/withTheme';

export const Heading = withTheme()(styled.div`
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    margin: ${props => (props.margin ? props.margin : 0)};
    font-size: ${props => (props.fontSize ? props.fontSize : '24px')};
    font-weight: ${props => (props.bolder ? 600 : 400)};
    color: ${props => (props.color ? props.color : props.theme.palette.common.black)};
    line-height: ${props => props.lineHeight};
    cursor: ${props => props.pointer && 'pointer'};

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
            background: ${props.theme.palette.common.black}};
        }
    `}

    ${props => props.link && `
        span, span a {
            cursor: pointer;
            position: relative;
            padding-bottom: 2px;
            text-decoration: none;
            color: ${props.theme.palette.primary.main};
        }
    `}

    ${props => (props.primary && `
      color: ${props.theme.palette.primary.main}
    `)};
`);

export const HeadingSm = withTheme()(styled(Heading)`
    font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
    color: ${props => props.error && props.theme.palette.error.main};
`);
