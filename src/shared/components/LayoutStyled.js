import styled from 'styled-components';
import withTheme from '@material-ui/core/styles/withTheme';
import Grid from '@material-ui/core/Grid';

export const Container = styled(Grid)` // inherits m-ui props
  max-width: 940px;
  height: ${props => props.fullScreen && '100vh'};
  min-height: ${props => props.minHeight}px;

  ${props => props.marginCenter && 'margin: 0 auto'};  // centering without flex wrapper;
`;

export const Column = withTheme(styled(Grid)` // inherits m-ui props
  position: relative;

  ${props => props.withBar && `
    &:before {
      content: "";
      position: absolute;
      top: -40px;
      left: -75px;
      width: 1px;
      height: 300px;
      background-color: ${props.theme.palette.primary.main};
      opacity: .2;
    }
  `}
`);

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  flex-wrap: ${props => (props.nowrap ? 'nowrap' : 'wrap')};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  width: ${props => props.width};
  margin: ${props => props.margin && props.margin};
`;
