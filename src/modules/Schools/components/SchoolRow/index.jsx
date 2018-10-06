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


const School = ({ school }) => (
  <TableRow>
    <TableCell component="th" scope="row">
      {school.name}
    </TableCell>
    {/* <TableCell numeric>{n.calories}</TableCell>
    <TableCell numeric>{n.fat}</TableCell>
    <TableCell numeric>{n.carbs}</TableCell>
    <TableCell numeric>{n.protein}</TableCell> */}
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
        to={`/speakers/${school.id}/edit`}
        aria-label="Edit"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        // onClick={handleDelete(item.id)}
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>

    </TableCell>
  </TableRow>
);

School.propTypes = {
  school: PropTypes.shape(PropTypes.object).isRequired,
};

export default School;
