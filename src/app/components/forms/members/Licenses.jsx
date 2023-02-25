// External Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';

// Store Dependencies
import { CREATE_LICENSE, NEW_LICENSE } from 'app/graph/members';

// Componenet Dependencies
import { Text } from 'app/components/forms/Controls';
import { BaseForm } from 'app/components/forms/Base';
import { RolesDropDown } from 'app/components/forms/dropdowns/Roles';
import { ROLES } from '../dropdowns/Roles';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({}));

/**
 * Login Form
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const LicensesForm = ({ user, accountId }) => {
  const [createLicense, { data, error, loading }] = useMutation(CREATE_LICENSE, {
    update: cache => {
      cache.modify({
        fields: (value, details) => {},
      });
    },
  });

  const handleSave = ({ variables }) => {
    createLicense({
      variables: {
        ...variables,
        count: parseInt(variables.count),
        application: variables.role === ROLES[0] ? 'AuroraAdmin' : 'Aurora',
        accountId: user.accountId,
      },
    });
  };

  return (
    <BaseForm
      data={data}
      error={error}
      loading={loading}
      actionLabel="Create Licenses"
      user={user}
      submit={handleSave}
      requiredFields={['role', 'count']}
      initialValues={{ role: ROLES[0], count: 1 }}
    >
      <Grid item xs={6}>
        <RolesDropDown accountId={accountId} />
      </Grid>
      <Grid item xs={6}>
        <Text type="number" name="count" label="Count" inputProps={{ min: 0, max: 50 }} />
      </Grid>
    </BaseForm>
  );
};
