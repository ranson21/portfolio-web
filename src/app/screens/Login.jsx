// External Dependencies
import React from 'react';
import { Paper, Grid, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Component Dependencies
import { AuthForm } from 'app/components/forms/Auth';

// Create the Login Screen Styles
export const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    zIndex: 1201,
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
}));

export default props => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
          <AuthForm {...props} />
        </Grid>
      </Slide>
    </Grid>
  );
};
