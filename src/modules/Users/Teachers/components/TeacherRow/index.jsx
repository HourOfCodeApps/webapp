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
      <TableRow style={{ background: teacher.teacherApproved ? 'transparent' : 'yellow' }}>
        <TableCell component="th" scope="row">
          {teacher.firstName}
          &nbsp;
          {teacher.lastName}
        </TableCell>
        <TableCell>
          {teacher.schoolId}
        </TableCell>
        <TableCell>
          {teacher.email}
        </TableCell>
        <TableCell>
          {teacher.phone}
        </TableCell>
        <TableCell number>
          {!teacher.teacherApproved && (
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
