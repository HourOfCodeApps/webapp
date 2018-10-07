import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Container = styled(Grid)`
  max-width: 940px;
  height: 100vh;
`;

export const Column = styled(Grid)`
  position: relative;
  
  ${props => props.withBar && `
    &:before {
      content: "";
      position: absolute;
      top: -15px;
      left: -75px;
      width: 1px;
      height: 300px;
      background: #b9b9b9;
    }
  `}
`;