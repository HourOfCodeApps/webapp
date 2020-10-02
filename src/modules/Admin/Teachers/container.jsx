import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui-v3/core/styles';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Table from '@material-ui-v3/core/Table';
import TableBody from '@material-ui-v3/core/TableBody';
import TableCell from '@material-ui-v3/core/TableCell';
import TableHead from '@material-ui-v3/core/TableHead';
import TableRow from '@material-ui-v3/core/TableRow';
import Paper from '@material-ui-v3/core/Paper';
import { toast } from 'react-toastify';
import { compose } from 'redux';

import { withSchools } from 'modules/Schools';
import Loading from 'shared/components/Loading';

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
        schoolsMap,
        teachers,
        teachersFetching,
        teachersFetchingError,
      },
    } = this;

    if (teachersFetching) {
      return <Loading />;
    }

    if (teachersFetchingError) {
      return <div>{teachersFetchingError.message}</div>;
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{'Ім\'я'}</TableCell>
              <TableCell>Школа</TableCell>
              <TableCell>Пошта</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map(t => (
              <TeacherRow
                key={t.uid}
                teacher={t}
                onApprove={handleApproveTeacherClick}
                school={(t.teacher.schoolId && schoolsMap[t.teacher.schoolId]) || {}}
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
  schoolsMap: PropTypes.shape(PropTypes.object).isRequired,
  teachers: PropTypes.shape(PropTypes.array).isRequired,
  teachersApproving: PropTypes.bool.isRequired,
  teachersApprovingError: PropTypes.shape(PropTypes.object),
  teachersFetching: PropTypes.bool.isRequired,
  teachersFetchingError: PropTypes.shape(PropTypes.object),
};

Teachers.defaultProps = {
  teachersApprovingError: null,
  teachersFetchingError: null,
};

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withSchools,
)(Teachers);
