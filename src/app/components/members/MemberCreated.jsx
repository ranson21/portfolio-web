import React from 'react';
import { Button, Grid, Slide, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
  label: {
    fontWeight: 700,
  },
}));

export const MemberCreated = ({ member, handleClose, fetching }) => {
  const classes = useStyles();

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12}>
          <Alert severity="success">Successfully Added New Member</Alert>
        </Grid>
        <Grid item xs={3} classes={{ root: classes.label }}>
          Username:
        </Grid>
        <Grid item xs={9}>
          {member?.email}
        </Grid>
        <Grid item xs={3} classes={{ root: classes.label }}>
          Password:
        </Grid>
        <Grid item xs={9}>
          {member?.password}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            disabled={fetching}
            endIcon={fetching && <CircularProgress size={20} />}
          >
            OK
          </Button>
        </Grid>
      </Grid>
    </Slide>
  );
};
