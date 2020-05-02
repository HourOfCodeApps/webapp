import React from 'react';
import MuiContainer from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      '&:last-child': {
        marginBottom: theme.spacing(4),
      },
    },
  },
}));

const Container: React.FunctionComponent<React.ComponentProps<typeof MuiContainer>> = (props) => {
  const classes = useStyles();


  return (<MuiContainer {...props} className={`${classes.root} ${props.className}`} />);
}

export default Container;
