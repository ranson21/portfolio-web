// External Dependencies
import React, { useState } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useMutation, gql } from '@apollo/client';

// Store Dependencies
import { validate } from 'app/utils/validators';

// Componenet Dependencies
import { Text } from 'app/components/forms/Controls';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  margin: {
    marginLeft: 0,
    margin: theme.spacing(1),
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
}));

/**
 * Login Form
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const TwoFactorForm = ({ hideDetails }) => {
  // Create local state to handle auth errors
  const [formError, setFormError] = useState('');

  const classes = useStyles();

  const onSubmit = async values => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  };

  return (
    <Grid container className={classes.paper}>
      <Form
        onSubmit={onSubmit}
        validate={validate(['email', 'firstName', 'LastName'])}
        render={({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              {!hideDetails && (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        Two-factor authentication adds an extra layer of security to your account by requiring a randomly-generated,
                        one-time password in addition to your username and password.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>You can use SMS only for delivery.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        It is required to maintain at least 1 valid phone number so that we can protect your account from unauthorized
                        access
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <Text
                  required
                  type="phone"
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Phone Number"
                  mask="+1 (999) 999-9999"
                  fieldProps={{ parse: value => value.replace(/\)/g, '').replace(/\(/g, '').replace(/-/g, '').replace(/ /g, '') }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={invalid || submitting}
                  endIcon={submitting && <CircularProgress size={20} />}
                >
                  Update 2FA
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Grid>
  );
};
