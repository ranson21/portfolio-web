// External Dependencies
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { Avatar, Box, Button, CircularProgress, Grid, InputAdornment, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, LockOutlined, VpnKey as Key } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

// Componenet Dependencies
import { Copyright } from 'app/components/shared/Copyright';
import { Text } from 'app/components/forms/Controls';
import { validate } from 'app/utils/validators';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: 45,
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.contrastText,
  },
  root: {
    minWidth: 400,
    minHeight: 500,
  },
  alert: {
    marginLeft: theme.spacing(2),
  },
  spacer: {
    flex: 1,
  },
}));

/**
 * Login Form
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const AuthForm = props => {
  // Setup local state to hold the user details
  const [_, setUser] = useState({});

  // Create local state to handle auth errors
  const [formError, setFormError] = useState('');
  const [validating, setValiding] = useState(false);

  const classes = useStyles();

  const onSubmit = async values => {
    try {
      setValiding(true);

      // Send the login request
      const userCredential = await props.auth.signInWithEmailAndPassword(values.email, values.password);

      // Set the user object
      setUser(userCredential.user);
    } catch (error) {
      setValiding(false);
      setFormError(error?.message);
    }
  };

  return (
    <Grid container className={classes.paper}>
      <div className={classes.spacer} />
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Grid container className={classes.alert}>
        <Grid item xs>
          {formError && <Alert severity="error">{formError}</Alert>}
        </Grid>
      </Grid>
      <Form
        onSubmit={onSubmit}
        validate={validate(['email', 'password'])}
        render={({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Text
                  required
                  name="email"
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Text
                  required
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={invalid || submitting || validating}
              endIcon={(submitting || validating) && <CircularProgress size={20} />}
            >
              Sign In
            </Button>
          </form>
        )}
      />
      <Grid container direction="column" alignItems="flex-end">
        <Grid item xs>
          <Link href="#/resetPassword" variant="body2" color="primary">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <div className={classes.spacer} />
      <Box mt={5}>
        <Copyright />
      </Box>
    </Grid>
  );
};
