import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ApproveIcon from '@material-ui/icons/Done';

class Teacher extends React.Component {
  handleApprove = () => {
    const { teacher, onApprove } = this.props;
    onApprove(teacher.uid);
  }

  render() {
    const {
      handleApprove,
      props: { teacher },
    } = this;

    return (
      <TableRow style={{ background: teacher.teacher.isApproved ? 'transparent' : 'yellow' }}>
        <TableCell component="th" scope="row">
          {teacher.id}
          {teacher.profile.firstName}
          &nbsp;
          {teacher.profile.lastName}
        </TableCell>
        <TableCell>
          {teacher.teacher.schoolId}
        </TableCell>
        <TableCell>
          {teacher.profile.email}
        </TableCell>
        <TableCell>
          {teacher.profile.phone}
        </TableCell>
        <TableCell number>
          {!teacher.teacher.isApproved && (
            <IconButton
              onClick={handleApprove}
              aria-label="Approve"
            >
              <ApproveIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

Teacher.propTypes = {
  teacher: PropTypes.shape(PropTypes.object).isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default Teacher;
