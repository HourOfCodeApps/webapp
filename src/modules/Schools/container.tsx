import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link as RouterLink } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { toast } from 'react-toastify';

import TableContainer from '@material-ui/core/TableContainer';
import Container from 'shared/components/Container';

import ConfirmationDialog from 'shared/components/ConfirmationDialog';
import Loading from 'shared/components/Loading';
import ActionBar from 'shared/components/ActionBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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


type SchoolsListContainerProps = {
  onDeleteSchool: () => void;
  onFetchSchools: () => void;

  schoolDeleting: boolean;
  schoolDeletingError: Error | null;
  schools: Object[];
  schoolsFetching: boolean;
  schoolsFetchingError: Error | null;
}

class Schools extends React.Component<SchoolsListContainerProps> {
  // static propTypes = {
  //   history: PropTypes.shape({
  //     push: PropTypes.func.isRequired,
  //   }).isRequired,
  //   location: PropTypes.shape({
  //     pathname: PropTypes.string.isRequired,
  //     search: PropTypes.string.isRequired,
  //   }).isRequired,
  // }

  // static defaultProps = {
  //   schools: [],
  //   schoolsFetchingError: null,
  //   schoolDeletingError: null,
  // }

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
      <>
        <Container>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h4">Школи</Typography>
            </Box>
            <Box flexGrow={1}>
              <ActionBar>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  component={RouterLink}
                  to="/schools/new"
                >
                  Додати школу
                </Button>
              </ActionBar>
            </Box>
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
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
          </TableContainer>
        </Container>
        {deleteConfirmationDialogShown && (
          <ConfirmationDialog
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteSchoolConfirm}
            confirmLabel="Так"
            cancelLabel="Ні"
            title="Ви впевнені, що хочете видалити цю школу?"
          />
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
