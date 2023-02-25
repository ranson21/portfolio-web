// External Depedencies
import React from 'react';
import { Typography, Card, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SettingsApplications } from '@material-ui/icons';

// Component Dependencies

// Store dependencies
import { formatDate } from 'app/utils/format';

// Style dependencies

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  card: {
    width: 300,
  },
  label: {
    fontWeight: 700,
  },
  image: {
    height: 100,
    width: 100,
  },
  action: {
    paddingTop: '0 !important',
    margin: `-${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
  removeLicense: {
    color: 'white',
    backgroundColor: theme.palette.error.dark,
  },
}));

/**
 * Accounts Screen Component
 */
export const ApplicationCard = ({ app, role, endDate }) => {
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.card }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={4}>
          <SettingsApplications classes={{ root: classes.image }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="subtitle2" classes={{ root: classes.label }}>
            {app} ({role})
          </Typography>
          {endDate && <Typography variant="caption">Expires {formatDate(endDate, 'M/D/YYYY')}</Typography>}
        </Grid>
        <Grid container classes={{ root: classes.action }} spacing={2}>
          <Grid item>
            <Button variant="contained" size="small">
              Change Expiration
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" size="small" classes={{ root: classes.removeLicense }}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
