import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  actionBar: {
    textAlign: 'right',
    '& > *': {
      margin: theme.spacing(0, 1),
      '&:first-child': {
        marginLeft: 0,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
}));

const ActionBar: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.actionBar}>
      {props.children}
    </div>
  );
}

export default ActionBar;
