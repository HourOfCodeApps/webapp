import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
// import EditIcon from 'material-ui-icons/Edit';


class School extends React.Component {
  handleDelete = () => {
    const { school, onDelete } = this.props;
    onDelete(school.id);
  }

  render() {
    const {
      handleDelete,
      props: { school },
    } = this;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {school.name}
        </TableCell>
        <TableCell>
          {school.addressStreet}
          &nbsp;
          {school.addressBuilding}
        </TableCell>
        <TableCell>{school.phones.join(', ')}</TableCell>
        <TableCell>
          <IconButton
            component={Link}
            to={`/school/${school.id}`}
            aria-label="View"
          >
            <ViewIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/school/${school.id}/edit`}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleDelete}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>

        </TableCell>
      </TableRow>
    );
  }
}

School.propTypes = {
  school: PropTypes.shape(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default School;
