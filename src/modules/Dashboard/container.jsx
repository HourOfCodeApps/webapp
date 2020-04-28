import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SchoolIcon from '@material-ui/icons/AccountBalance';
import TeachersIcon from '@material-ui/icons/Group';
import MentorsIcon from '@material-ui/icons/GroupOutlined';
import TimeslotsIcon from '@material-ui/icons/Event';
import ReportsIcon from '@material-ui/icons/PieChart';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';

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
  <Container>
    <Grid container spacing={2}>
      {links.map(link => (
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <ButtonBase
            focusRipple
            key={link.url}
            component={RouterLink}
            to={link.url}
            style={{ display: 'block' }}
          >
            <Paper style={{ padding: 20 }}>
              <Typography align="center" variant="h2">
                {link.icon}
              </Typography>
              <Typography align="center" variant="h5">
                {link.title}
              </Typography>
            </Paper>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Dashboard.propTypes = {
//   classes: PropTypes.shape(PropTypes.object).isRequired,
// };

export default Dashboard;
