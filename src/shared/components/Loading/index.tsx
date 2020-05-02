import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '150px',
    height: '100%',
    width: '100%',
    userSelect: 'none',
    // backgroundColor: theme.palette.background.default,
  },
}));

const AppLoading: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  );
};

export default AppLoading;
