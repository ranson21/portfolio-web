// External Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

// Store Dependencies
import { UPDATE_MEMBER } from 'app/graph/members';
import { refreshMember } from 'app/store/reducers/auth';

// Componenet Dependencies
import { Text } from 'app/components/forms/Controls';
import { BaseForm } from 'app/components/forms/Base';

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
export const ProfileForm = ({ user }) => {
  const [updateMember, { data, error, loading }] = useMutation(UPDATE_MEMBER);
  const dispatch = useDispatch();

  const handleSave = data => {
    dispatch(refreshMember({ user: data }));
  };

  return (
    <BaseForm
      afterSave={handleSave}
      type="update"
      loading={loading}
      actionLabel="Update Profile"
      user={user}
      data={data}
      error={error}
      submit={({ variables, user }) => updateMember({ variables: { ...variables, accountId: user.accountId, uid: user.uid } })}
      requiredFields={['email', 'displayName']}
    >
      <Grid item xs={12}>
        <Text
          required
          name="displayName"
          label="Display Name"
          helperText="Change your Display Name"
          fieldProps={{ initialValue: user.displayName }}
        />
      </Grid>
      <Grid item xs={12}>
        <Text required name="email" label="Email" fieldProps={{ initialValue: user.email }} />
        <Typography>
          Your email will be used for critical updates, notifications, and information about new features. You'll need to confirm your new
          email if you change it.
        </Typography>
      </Grid>
    </BaseForm>
  );
};
