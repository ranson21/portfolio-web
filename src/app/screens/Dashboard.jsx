// External Depedencies
import React, { useEffect, useState } from 'react';
import { Divider, Grid, TextField, Container, Typography, InputAdornment, Button } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import { makeStyles } from '@material-ui/core/styles';
import { OpenInNew } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// Component Dependencies
import { LoadScreen } from 'app/screens/Loading';
import { Tabs, Tab } from 'app/components/shared/Tabs';
import { ActionCard } from 'app/components/dashboard/ActionCard';
import { Chart } from 'app/components/dashboard/Chart';

import { ROUTES } from 'app/routes';

// Store dependencies

// Style dependencies
import { spacer, appBarHeight } from 'app/styles';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  spacer,
  menuButton: {
    margin: theme.spacing(1),
  },
  dashboard: {
    height: '100%',
    paddingTop: theme.spacing(4),
    color: theme.palette.textColor,
  },
  container: {
    height: `calc(100% - 53px)`,
  },
  root: {
    marginTop: appBarHeight,
    height: '100%',
  },
  chart: {
    height: 400,
  },
  header: {
    flex: 1,
  },
  launch: {
    paddingTop: theme.spacing(3),
  },
}));

const LIST_ACCOUNTS = gql`
  query Accounts {
    accounts {
      name
      type
    }
  }
`;

const data = [
  // {
  //   account: 'N/A',
  //   managers: 0,
  //   managersColor: 'hsl(283, 70%, 50%)',
  //   auditors: 0,
  //   auditorsColor: 'hsl(286, 70%, 50%)',
  //   engagements: 0,
  //   engagementsColor: 'hsl(224, 70%, 50%)',
  // },
];

/**
 * Dashboard Screen Component
 */
export const Dashboard = props => {
  const classes = useStyles();

  return (
    <Container classes={{ root: classes.root }}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Grid container>
            <Grid item classes={{ root: classes.header }}>
              <h1>Dashboard</h1>
            </Grid>
            <Grid item classes={{ root: classes.launch }}>
              <Button variant="contained" color="secondary" onClick={() => window.open(process.env._AURORA_URL)} endIcon={<OpenInNew />}>
                Launch Aurora
              </Button>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12} classes={{ root: classes.chart }}>
          <div className={classes.chart}>
            <Chart data={data} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-evenly">
            {ROUTES.filter(route => route.path !== 'home').map(route => (
              <ActionCard
                key={route.path}
                title={capitalize(route.path)}
                subheader={route.subtitle}
                details={route.description}
                action={`View ${capitalize(route.path)}`}
                path={`/${route.path}`}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
