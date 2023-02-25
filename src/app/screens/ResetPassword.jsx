// External Dependencies
import React from 'react';
import { Paper, Grid, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Component Dependencies
import { ResetPasswordForm } from 'app/components/forms/ResetPassword';

// Create the Login Screen Styles
export const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },

  image: {
    backgroundImage: "url('img/admin-background.png')",
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  login: {
    backgroundImage: "url('img/admin-background.png')",
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
  },
  container: {
    height: '100%',
    padding: 45,
  },
}));

export default props => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
        <Slide direction="left" in mountOnEnter unmountOnExit>
          <Grid container classes={{ root: classes.container }}>
            <ResetPasswordForm {...props} align="center" hideCurrentPassword />
          </Grid>
        </Slide>
      </Grid>
    </Grid>
  );
};
