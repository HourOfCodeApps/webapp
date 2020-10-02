import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui-v3/core/Button';
import Typography from '@material-ui-v3/core/Typography';
import { DateTime } from 'luxon';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui-v3/core/styles';

import Table from '@material-ui-v3/core/Table';
import TableBody from '@material-ui-v3/core/TableBody';
import TableCell from '@material-ui-v3/core/TableCell';
import TableHead from '@material-ui-v3/core/TableHead';
import TableRow from '@material-ui-v3/core/TableRow';

import ExpansionPanel from '@material-ui-v3/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui-v3/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui-v3/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui-v3/icons/ExpandMore';

import TimeslotRow from '../TimeslotRow';

const styles = {
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
};

class School extends React.Component {
  static propTypes = {
    selected: PropTypes.bool,
    school: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    timeslots: PropTypes.instanceOf(Array).isRequired,
    onApply: PropTypes.func.isRequired,
    onHover: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selected: false,
  }

  shouldComponentUpdate(nextProps) {
    if (!isEqual(this.props.school, nextProps.school)) {
      return true;
    }

    if (!isEqual(this.props.timeslots, nextProps.timeslots)) {
      return true;
    }

    if (!isEqual(this.props.onApply, nextProps.onApply)) {
      return true;
    }

    return false;
  }

  hoverOn = () => {
    this.props.onHover(this.props.school.id);
  }

  hoverOff = () => {
    this.props.onHover(null);
  }

  render() {
    const {
      classes, school, selected, timeslots, onApply,
    } = this.props;

    return (
      <ExpansionPanel
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
        classes={{
          root: selected && classes.selected,
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{school.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Час початку</TableCell>
                <TableCell>Клас</TableCell>
                <TableCell>Кількість учнів</TableCell>
                <TableCell>Коментар</TableCell>
                <TableCell>Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeslots.map(timeslot => (
                <TimeslotRow
                  key={timeslot.id}
                  timeslot={timeslot}
                  onApply={onApply}
                />
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(School);
