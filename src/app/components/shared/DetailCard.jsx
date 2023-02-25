// External Depedencies
import React from 'react';
import { Divider, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Style dependencies
import { breadCrumbHeight } from 'app/styles';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: `calc(100% - ${breadCrumbHeight}px)`,
  },
  panel: {
    padding: theme.spacing(2),
    width: 350,
    minHeight: 300,
  },
  label: {
    fontWeight: 700,
  },
  avatar: {
    height: 50,
    width: 50,
  },
  row: {
    padding: theme.spacing(2),
    width: '100%',
    minHeight: 100,
  },
  container: {
    flex: 1,
  },
}));

/**
 * Accounts Screen Component
 */
export const DetailCard = ({ label, children }) => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.row }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">{label}</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};
