import React from 'react';
import MuiContainer from '@material-ui/core/Container';
import MuiTableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  actionCell: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
}));

const ActionTableCell: React.FunctionComponent<React.ComponentProps<typeof MuiTableCell>> = (props) => {
  const classes = useStyles();

  return (<MuiTableCell {...props} className={`${classes.actionCell} ${props.className}`} />);
}

export default ActionTableCell;
