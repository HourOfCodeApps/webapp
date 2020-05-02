import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ApproveIcon from '@material-ui/icons/Done';

import ActionTableCell from 'shared/components/Table/ActionTableCell';

type TeacherRowProps = {
  onApprove: (id: string) => void;
  school: {
    id: string;
    name: string;
  };
  teacher: {
    uid: string;
    profile: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    teacher: {
      isApproved: boolean;
    }
  };
}

class TeacherRow extends React.Component<TeacherRowProps> {
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
        <TableCell>
          {teacher.profile.firstName}
          &nbsp;
          {teacher.profile.lastName}
        </TableCell>
        <TableCell>
          {school.name} // ToDo: make a link
        </TableCell>
        <TableCell>
          {teacher.profile.email}
        </TableCell>
        <TableCell>
          {teacher.profile.phone}
        </TableCell>
        <ActionTableCell>
          {!teacher.teacher.isApproved && (
            <IconButton
              onClick={handleApprove}
              aria-label="Approve"
            >
              <ApproveIcon />
            </IconButton>
          )}
        </ActionTableCell>
      </TableRow>
    );
  }
}

export default TeacherRow;
