import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DateTime } from 'luxon';
import isEqual from 'lodash/isEqual';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TimeslotRow from '../TimeslotRow';

class School extends React.Component {
  static propTypes = {
    school: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    timeslots: PropTypes.instanceOf(Array).isRequired,
    onApply: PropTypes.func.isRequired,
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

  render() {
    const { school, timeslots, onApply } = this.props;

    return (
      <ExpansionPanel>
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

export default School;
