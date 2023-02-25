// External Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

// Store Dependencies
import { validate } from 'app/utils/validators';
import { filterDirty } from 'app/utils/format';

// Componenet Dependencies
import { isEmpty } from 'lodash';

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
export const BaseForm = ({
  children,
  user,
  submit,
  data,
  error,
  loading,
  type,
  afterSave,
  actionLabel,
  requiredFields,
  FormFields,
  ...formProps
}) => {
  // Create local state to handle auth errors
  const [alert, setAlert] = useState({});
  const [updatedFields, setDirty] = useState({});
  const [updatedValues, setDirtyValues] = useState({});

  const classes = useStyles();

  const onSubmit = async (values, dirty) => {
    return new Promise((resolve, reject) => {
      const { dirtyFields } = dirty.getState();
      setDirty(dirtyFields);
      setDirtyValues(values);

      const variables = filterDirty(dirtyFields, values);
      submit({ variables, user });

      resolve();
    });
  };

  useEffect(() => {
    if (error) {
      setAlert({ type: 'error', message: error?.message });
    }

    if (data) {
      const message = type === 'update' ? `Successfully updated ${Object.keys(updatedFields).join(', ')}` : 'Success!';

      if (afterSave) {
        afterSave(updatedValues);
      }

      // Clear the state
      setDirty({});
      setDirtyValues({});

      setAlert({ type: 'success', message });
    }
  }, [error, data]);

  const formatSubmit = (dirtyFields, form, submit) => event => {
    const promise = submit(event, dirtyFields);

    const { values } = form.getState();

    if (promise) {
      promise.then(() => {
        form.reset(values);
      });
    }
  };

  const DefaultRender = ({ handleSubmit, submitting, invalid, initialValues, dirtyFields, form }) => {
    return (
      <form onSubmit={formatSubmit(dirtyFields, form, handleSubmit)} className={classes.form}>
        <Grid container spacing={2}>
          <Grid container className={classes.alert}>
            <Grid item xs>
              {!isEmpty(alert) && <Alert severity={alert.type}>{alert.message}</Alert>}
            </Grid>
          </Grid>
          {children}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading || invalid || submitting || (type === 'update' && isEmpty(dirtyFields))}
              endIcon={(loading || submitting) && <CircularProgress size={20} />}
            >
              {actionLabel}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Grid container className={classes.paper}>
      <Form onSubmit={onSubmit} validate={validate(requiredFields)} render={FormFields || DefaultRender} {...formProps} />
    </Grid>
  );
};
