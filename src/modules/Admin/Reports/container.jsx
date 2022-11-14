import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Loading from 'shared/components/Loading';
import {
  subscribeReports,
  unsubscribeReports,
  generateReport,
} from './actions';

import {
//   selectAllTimeslotsCount,
  selectReports,
//   selectReportsFetching,
//   selectReportsFetchingError,
} from './selectors';

import ReportRow from './components/ReportRow';

class Reports extends React.Component {
  componentDidMount() {
    this.props.onSubscribeReports();
  }

  componentWillUnmount() {
    this.props.onUnsubscribeReports();
  }

  render() {
    const {
      props: {
        onGenerateReport,
        reports,
        reportsFetching,
        reportsFetchingError,
      },
    } = this;

    return (
      <React.Fragment>
        <Typography variant="display1" gutterBottom>
          Звіти
        </Typography>

        {reportsFetching && <Loading />}

        {reportsFetchingError && <div>{reportsFetchingError.message}</div>}

        {!reportsFetching && !reportsFetchingError && (
          <Paper>
            <Table>
              <TableHead>
                <TableRow selected>
                  <TableCell>Звіт</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell align="center">Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map(report => (
                  <ReportRow
                    key={report.id}
                    report={report}
                    onGenerateReport={onGenerateReport}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </React.Fragment>
    );
  }
}

Reports.propTypes = {
  onSubscribeReports: PropTypes.func.isRequired,
  onUnsubscribeReports: PropTypes.func.isRequired,
  onGenerateReport: PropTypes.func.isRequired,
  reports: PropTypes.instanceOf(Array),
  reportsFetching: PropTypes.bool.isRequired,
  reportsFetchingError: PropTypes.instanceOf(Object),
};

Reports.defaultProps = {
  reports: [],
  reportsFetchingError: null,
};

const mapStateToProps = createSelector(
  selectReports(),
  reports => ({ reports }),
);

const mapDispatchToProps = {
  onSubscribeReports: subscribeReports,
  onUnsubscribeReports: unsubscribeReports,
  onGenerateReport: generateReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
export {
  Reports as ReportsComponent,
};
