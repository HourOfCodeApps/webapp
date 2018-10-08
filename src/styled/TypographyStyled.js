import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { getColor } from './styles';


export const Heading = styled.div`
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    margin: ${props => props.margin ? props.margin : 0};
    font-size: ${props => props.fontSize ? props.fontSize : '24px'};
    font-weight: ${props => props.bolder ? 600 : 400};
    color: ${props => getColor(props.color)};
    line-height: ${props => props.lineHeight};

    ${props => props.link && `
        span {
            text-decoration: underline;
            cursor: pointer;
        }
    `}

    & + ${HeadingSm} {
        margin-top: 10px;
    }

`

export const HeadingSm = styled(Heading)`
    font-size: 16px;
`;