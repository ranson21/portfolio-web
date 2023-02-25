// External Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress, Avatar, Link, Box } from '@material-ui/core';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useMutation, gql } from '@apollo/client';
import { LockOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// Store Dependencies
import { validatePassword } from 'app/utils/validators';
import { COMPLETE_RESET_PASSWORD } from 'app/graph/auth';
import { setAuth } from 'app/store/reducers/auth';

// Componenet Dependencies
import { Text } from 'app/components/forms/Controls';
import { Copyright } from 'app/components/shared/Copyright';

import { spacer } from 'app/styles';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  spacer,
  margin: {
    marginLeft: 0,
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  alert: {
    marginLeft: theme.spacing(2),
  },
  actions: {
    display: 'flex',
  },
}));

/**
 * Login Form
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const ResetPasswordForm = ({ hideCurrentPassword, align, auth }) => {
  // Setup the Login mutation
  const [completeResetPassword, { data, error, loading }] = useMutation(COMPLETE_RESET_PASSWORD);

  // Create local state to handle auth errors
  const [formError, setFormError] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = async values => {
    try {
      await auth.currentUser.updatePassword(values.newPassword);
      completeResetPassword({ variables: { uid: auth.currentUser.uid } });

      return new Promise((resolve, reject) => {
        resolve();
      });
    } catch (error) {
      setFormError(error);
    }
  };

  useEffect(() => {
    if (error) {
      setFormError(error?.message);
    }

    if (data && !error) {
      const token = JSON.parse(atob(data?.completeResetPassword?.token.split('.')[1]));

      dispatch(
        setAuth({
          isAuth: true,
          user: {
            ...auth.currentUser,
            app: token.claims.app,
            role: token.claims.role,
            disabled: token.claims.disabled,
            accountId: token.claims.account,
          },
          token: data?.login?.token,
        })
      );
    }
  }, [error, data]);

  return (
    <Grid container className={classes.paper} justify={align || 'space-between'}>
      {hideCurrentPassword && <div className={classes.spacer} />}
      <Form
        onSubmit={onSubmit}
        validate={validatePassword('newPassword', 'confirmNewPassword')}
        render={({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              {hideCurrentPassword ? (
                <Grid container spacing={2} alignContent="center" direction="column">
                  <Grid container justify="center">
                    <Avatar className={classes.avatar}>
                      <LockOutlined />
                    </Avatar>
                  </Grid>
                  <Grid container justify="center">
                    <Typography variant="h6">Reset your Password</Typography>
                  </Grid>
                  {formError && <Alert severity="error">{formError?.message}</Alert>}
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Text required type="password" name="currentPassword" label="Current Password" placeholder="Current Password" />
                  <Typography>You need to enter your current password to set a new password.</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Text required type="password" name="newPassword" label="New Password" placeholder="New Password" />
              </Grid>
              <Grid item xs={12}>
                <Text required type="password" name="confirmNewPassword" label="Confirm New Password" placeholder="Confirm New Password" />
              </Grid>
              <Grid item xs={12} classes={{ root: classes.actions }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={invalid || submitting || loading}
                  endIcon={submitting && <CircularProgress size={20} />}
                >
                  {hideCurrentPassword ? 'Reset' : 'Change'} Password
                </Button>
                <div className={classes.spacer} />
                {hideCurrentPassword && (
                  <Link href="#/login" variant="body2" color="primary">
                    Sign In
                  </Link>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      />
      <div className={classes.spacer} />
      {hideCurrentPassword && (
        <Grid container direction="column" alignItems="center">
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
