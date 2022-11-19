import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SchoolIcon from '@mui/icons-material/AccountBalance';
import TeachersIcon from '@mui/icons-material/Group';
import MentorsIcon from '@mui/icons-material/GroupOutlined';
import TimeslotsIcon from '@mui/icons-material/Event';
import ReportsIcon from '@mui/icons-material/PieChart';
import ButtonBase from '@material-ui/core/ButtonBase';

const links = [
  {
    title: 'Школи',
    url: '/schools',
    icon: <SchoolIcon fontSize="inherit" />,
  },
  {
    title: 'Вчителі',
    url: '/teachers',
    icon: <TeachersIcon fontSize="inherit" />,
  },
  {
    title: 'Ментори',
    url: '/mentors',
    icon: <MentorsIcon fontSize="inherit" />,
  },
  {
    title: 'Уроки',
    url: '/timeslots',
    icon: <TimeslotsIcon fontSize="inherit" />,
  },
  {
    title: 'Звіти',
    url: '/reports',
    icon: <ReportsIcon fontSize="inherit" />,
  },
];

const Dashboard = () => (
  <React.Fragment>
    <Grid container spacing={16}>
      {links.map(link => (
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <ButtonBase
            focusRipple
            key={link.url}
            component={props => <Link to={link.url} {...props} />}
            style={{
              display: 'block',
            }}
          >
            <Paper style={{ padding: 20 }}>
              <Typography align="center" variant="display1" style={{ fontSize: 96, lineHeight: 0.8 }}>
                {link.icon}
              </Typography>
              <Typography align="center" variant="display1">
                {link.title}
              </Typography>
            </Paper>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  </React.Fragment>
);

// Dashboard.propTypes = {
//   classes: PropTypes.shape(PropTypes.object).isRequired,
// };

export default Dashboard;
