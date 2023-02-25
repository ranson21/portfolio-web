import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Link, Breadcrumbs, Typography, Grid } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import { useApolloClient } from '@apollo/client';

import { parseURL } from 'app/utils/parser';

// Styles dependencies
import { appBarHeight, breadCrumbHeight } from 'app/styles';
import { startCase } from 'lodash';

// Create the styles for this component
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: appBarHeight,
    width: '100%',
    height: breadCrumbHeight,
  },
  root: {
    height: '100%',
  },
  list: {
    marginLeft: theme.spacing(2),
    height: '100%',
  },
}));

export const NavCrumbs = () => {
  // Create the JSS Styles
  const classes = useStyles();

  // Extract the current route and routes
  const [currentRoute, ...routes] = parseURL();

  // Get the apollo client instance
  const client = useApolloClient();

  return (
    <Paper classes={{ root: classes.paper }}>
      <Breadcrumbs aria-label="breadcrumb" classes={{ root: classes.root, ol: classes.list }}>
        {routes.map(route => {
          return (
            <Link key={route} color="inherit" href={`#/${route}`}>
              {capitalize(route.split('-').join(' '))}
            </Link>
          );
        })}
        <Typography color="textPrimary">{startCase(currentRoute.split('-').join(' '))}</Typography>
      </Breadcrumbs>
    </Paper>
  );
};
