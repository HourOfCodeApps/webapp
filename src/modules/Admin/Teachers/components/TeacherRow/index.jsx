import React from 'react';
import PropTypes from 'prop-types';

import ApproveIcon from '@material-ui/icons/Done';

import { IconButton } from 'shared/components/Buttons';
import { TableCell, TableRow } from 'shared/components/Table';

class Teacher extends React.Component {
  handleApprove = () => {
    const { teacher, onApprove } = this.props;
    onApprove(teacher.uid);
  }

  render() {
    const {
      handleApprove,
      props: { school, teacher },
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
          {/* {teacher.teacher.schoolId} */}
          {school.name}
        </TableCell>
        <TableCell>
          {teacher.profile.email}
        </TableCell>
        <TableCell>
          {teacher.profile.phone}
        </TableCell>
        <TableCell numeric>
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
  school: PropTypes.shape(PropTypes.object).isRequired,
  teacher: PropTypes.shape(PropTypes.object).isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default Teacher;
