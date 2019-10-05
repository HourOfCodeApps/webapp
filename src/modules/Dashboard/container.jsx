import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'shared/components/Typography';
import SimpleTable from './SimpleTable';

const styles = {
  tableContainer: {
    height: 320,
  },
};

const Dashboard = ({ classes }) => (
  <React.Fragment>
    <Typography variant="display1" gutterBottom>
      Schools
    </Typography>
    <div className={classes.tableContainer}>
      <SimpleTable />
    </div>
  </React.Fragment>
);

Dashboard.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
};

export default withStyles(styles)(Dashboard);
