// External Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Button, Typography, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { Alert } from '@material-ui/lab';

// Store Dependencies
import { ACCOUNTS, CREATE_ACCOUNT } from 'app/graph/account';
import { ACCOUNT_TYPES, DEFAULT_THEME } from 'app/config/constants';

// Componenet Dependencies
import { UploadPhoto } from 'app/components/forms/accounts/UploadPhoto';
import { ColorPicker, Text, SelectField } from 'app/components/forms/Controls';
import { BaseForm } from 'app/components/forms/Base';
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
  label: {
    fontWeight: 700,
  },
  remove: {
    margin: `${theme.spacing(2)}px 0`,
  },
  fieldsContainer: {
    paddingTop: theme.spacing(2),
  },
}));

/**
 * Login Form
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const CreateAccountForm = ({ user, refresh }) => {
  const classes = useStyles();
  const [logo, setProfileImage] = useState('');
  const [creatAccount, { data, error, loading }] = useMutation(CREATE_ACCOUNT, {
    update: (cache, { data: { createAccount } }) => {
      const result = cache.readQuery({
        query: ACCOUNTS,
      });

      cache.writeQuery({
        query: ACCOUNTS,
        data: { accounts: [...result.accounts, createAccount] },
      });

      history.push(`/accounts/${createAccount?.name}`);
    },
  });

  const history = useHistory();

  const handleSave = (event, form) => {
    event.preventDefault();

    const {
      values: { primaryColor, secondaryColor, ...account },
    } = form.getState();

    console.log(account);
    creatAccount({
      variables: {
        ...account,
        theme: {
          primaryColor,
          secondaryColor,
          logo,
        },
      },
    });
  };

  return (
    <Grid container className={classes.container}>
      <BaseForm
        data={data}
        error={error}
        loading={loading}
        actionLabel="Create Account"
        requiredFields={['name', 'type']}
        FormFields={({ form, handleSubmit, submitting, invalid }) => {
          return (
            <form onSubmit={event => handleSave(event, form)} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Alert severity="info">
                    New accounts receive 1 Manager license and 2 Auditor licenses by default. You can add more after you have created the
                    account.
                  </Alert>
                </Grid>
                <Grid item xs={12}>
                  <Text required name="name" label="Account Name" />
                </Grid>
                <Grid item xs={12}>
                  <SelectField required id="account-type-dropdown" label="Account Type" name="type">
                    {ACCOUNT_TYPES.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" classes={{ root: classes.label }}>
                    Theme
                  </Typography>
                  <Divider />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <UploadPhoto setProfileImage={setProfileImage} />
                    </Grid>
                    <Grid item xs={12}>
                      <ColorPicker name="primaryColor" label="Primary Theme Color" />
                    </Grid>
                    <Grid item xs={12}>
                      <ColorPicker name="secondaryColor" label="Secondary Theme Color" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading || invalid || submitting}
                    endIcon={(loading || submitting) && <CircularProgress size={20} />}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
        initialValues={{ type: ACCOUNT_TYPES[0].value, primaryColor: DEFAULT_THEME.primary, secondaryColor: DEFAULT_THEME.secondary }}
      />
    </Grid>
  );
};
