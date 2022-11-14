import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RefreshIcon from '@material-ui/icons/Refresh';
import DownloadIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const ReportRow = ({ onGenerateReport, report }) => (
  <TableRow>
    <TableCell>
      {report.title}
    </TableCell>
    <TableCell>
      {report.generationTime && report.generationTime.toString()}
    </TableCell>
    {/* <TableCell>
      <CircularProgress />
    </TableCell> */}
    <TableCell>
      {report.url && (
        <IconButton component={props => <a href={report.url} {...props}>{props.children}</a>}>
          <DownloadIcon />
        </IconButton>
      )}
      {report.inProgress && (
        <CircularProgress />
      )}
      {!report.inProgress && (
        <IconButton onClick={() => onGenerateReport(report.id)}><RefreshIcon /></IconButton>
      )}
    </TableCell>
  </TableRow>
);

ReportRow.propTypes = {
  onGenerateReport: PropTypes.func.isRequired,
  report: PropTypes.shape(PropTypes.object).isRequired,
};

export default ReportRow;
