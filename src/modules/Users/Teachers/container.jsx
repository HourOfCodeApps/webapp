import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';

import {
  approveTeachers,
  fetchTeachers,
} from './actions';

import {
  selectTeachers,
  selectTeachersApproving,
  selectTeachersApprovingError,
  selectTeachersFetching,
  selectTeachersFetchingError,
} from './selectors';

import TeacherRow from './components/TeacherRow';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

class Teachers extends React.Component {
  componentDidMount() {
    this.props.onFetchTeachers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.teachersApproving && !this.props.teachersApproving) {
      if (this.props.teachersApprovingError) {
        toast.error(this.props.teachersApprovingError.message);
      } else {
        toast.success('Вчителя успішно підтверджено');
        this.props.onFetchTeachers();
      }
    }
  }

  handleApproveTeacherClick = (id) => {
    this.props.onApproveTeachers(id);
  }

  render() {
    // const { classes } = this.props;

    const {
      handleApproveTeacherClick,
      // handleDeleteClick,
      // handleDeleteCancel,
      // handleDeleteSchoolConfirm,
      // state: {
      //   deleteConfirmationDialogShown,
      // },
      props: {
        classes,
        teachers,
        teachersFetching,
        teachersFetchingError,
      },
    } = this;

    if (teachersFetching) {
      return <div>Loading</div>;
    }

    if (teachersFetchingError) {
      return <div>{teachersFetchingError.message}</div>;
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Ім'я</TableCell>
              <TableCell>Школа</TableCell>
              <TableCell>Пошта</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map(t => (
              <TeacherRow
                key={t.id}
                teacher={t}
                onApprove={handleApproveTeacherClick}
                // onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Teachers.propTypes = {
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onApproveTeachers: PropTypes.func.isRequired,
  onFetchTeachers: PropTypes.func.isRequired,
};

// export default withStyles(styles)(Teachers);


const mapStateToProps = createSelector(
  selectTeachers(),
  selectTeachersApproving(),
  selectTeachersApprovingError(),
  selectTeachersFetching(),
  selectTeachersFetchingError(),
  (
    teachers, teachersApproving, teachersApprovingError, teachersFetching, teachersFetchingError,
  ) => ({
    teachers, teachersApproving, teachersApprovingError, teachersFetching, teachersFetchingError,
  }),
);

const mapDispatchToProps = {
  onApproveTeachers: approveTeachers,
  onFetchTeachers: fetchTeachers,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Teachers));
