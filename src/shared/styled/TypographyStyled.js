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
            background: #333;
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
                background: #333;
            }
        }
    `}

    & + ${HeadingSm} {
        margin-top: 10px;
    }

`

export const HeadingSm = styled(Heading)`
    font-size: 16px;
`;