import styled from "styled-components";

import Button from '@material-ui/core/Button';

export const Btn = styled(Button)`
  && {
    border-radius: 2px;
    border: 2px solid #44C0D1;
    margin-bottom: 15px;
    color: #44C0D1;

    &:hover {
      background: #44C0D1;
      color: #fff;
      box-shadow: 0 5px 8px rgba(0, 0, 0, .1);
    }

    ${props => (props.disabled && `
      border-color: rgba(0, 0, 0, 0.26);
    `)}
  }
`;