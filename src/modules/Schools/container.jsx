import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import AddIcon from '@material-ui/icons/Add';
import { toast } from 'react-toastify';

import ConfirmationDialog from 'shared/components/ConfirmationDialog';
import Loading from 'shared/components/Loading';
import Table, {
  TableBody, TableCell, TableHead, TableRow,
} from 'shared/components/Table';
import { Button } from 'shared/components/Buttons';


import {
  deleteSchool,
  fetchSchools,
} from './actions';

import {
  selectSchoolDeleting,
  selectSchoolDeletingError,
  selectSchools,
  selectSchoolsFetching,
  selectSchoolsFetchingError,
} from './selectors';

import SchoolRow from './components/SchoolRow';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class Schools extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      fab: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    onDeleteSchool: PropTypes.func.isRequired,
    onFetchSchools: PropTypes.func.isRequired,
    schoolDeleting: PropTypes.bool.isRequired,
    schoolDeletingError: PropTypes.instanceOf(Object),
    schools: PropTypes.instanceOf(Array),
    schoolsFetching: PropTypes.bool.isRequired,
    schoolsFetchingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    schools: [],
    schoolsFetchingError: null,
    schoolDeletingError: null,
  }

  state = {
    deleteConfirmationDialogShown: false,
    deleteSchoolId: null,
  };

  componentDidMount() {
    const { onFetchSchools } = this.props;
    onFetchSchools();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schoolDeleting && !this.props.schoolDeleting) {
      if (this.props.schoolDeletingError) {
        toast.error(this.props.schoolDeletingError.message);
      } else {
        toast.success('Школу успішно видалено');
        this.props.onFetchSchools();
      }
      this.handleDeleteCancel();
    }
  }

  handleDeleteClick = schoolId => this.setState({
    deleteConfirmationDialogShown: true,
    deleteSchoolId: schoolId,
  });

  handleDeleteCancel = () => this.setState({
    deleteConfirmationDialogShown: false,
    deleteSchoolId: null,
  });

  handleDeleteSchoolConfirm = () => {
    const { deleteSchoolId: schoolId } = this.state;
    this.props.onDeleteSchool(schoolId);
  }

  render() {
    const {
      handleDeleteClick,
      handleDeleteCancel,
      handleDeleteSchoolConfirm,
      state: {
        deleteConfirmationDialogShown,
      },
      props: {
        classes,
        schools,
        schoolsFetching,
        schoolsFetchingError,
      },
    } = this;

    if (schoolsFetching) {
      return <Loading />;
    }

    if (schoolsFetchingError) {
      return <div>{schoolsFetchingError.message}</div>;
    }

    return (
      <React.Fragment>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Назва</TableCell>
                <TableCell>Адреса</TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {schools.map(s => (
                <SchoolRow
                  key={s.id}
                  school={s}
                  onDelete={handleDeleteClick}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button
          variant="fab"
          className={classes.fab}
          color="primary"
          component={Link}
          to="school/new"
          aria-label="Add"
        >
          <AddIcon />
        </Button>
        {deleteConfirmationDialogShown && (
          <ConfirmationDialog
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteSchoolConfirm}
            confirmLabel="Так"
            cancelLabel="Ні"
            title="Ви впевнені, що хочете видалити цю школу?"
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  selectSchoolDeleting(),
  selectSchoolDeletingError(),
  selectSchools(),
  selectSchoolsFetching(),
  selectSchoolsFetchingError(),
  (
    schoolDeleting, schoolDeletingError, schools, schoolsFetching, schoolsFetchingError,
  ) => ({
    schoolDeleting, schoolDeletingError, schools, schoolsFetching, schoolsFetchingError,
  }),
);

const mapDispatchToProps = {
  onDeleteSchool: deleteSchool,
  onFetchSchools: fetchSchools,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Schools));
