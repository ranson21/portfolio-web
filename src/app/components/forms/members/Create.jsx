// External Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, gql } from '@apollo/client';

// Store Dependencies
import { CREATE_MEMBER, NEW_LICENSE } from 'app/graph/members';

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
export const CreateMemberForm = ({ user, accountId, licenseId, setMember }) => {
  const [creatMember, { data, error, loading }] = useMutation(CREATE_MEMBER);

  const handleSave = ({ variables }) => {
    creatMember({
      variables: {
        ...variables,
        licenseId,
        accountId,
      },
    });
  };

  useEffect(() => {
    setMember(data?.createMember);
  }, [data]);

  return (
    <BaseForm
      data={data}
      error={error}
      loading={loading}
      actionLabel="Create Member"
      user={user}
      submit={handleSave}
      requiredFields={['displayName', 'email']}
      initialValues={{ role: ROLES[0], count: 1 }}
    >
      <Grid item xs={12}>
        <Text required name="displayName" label="Display Name" />
      </Grid>
      <Grid item xs={12}>
        <Text required name="email" label="Email" />
      </Grid>
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
    </BaseForm>
  );
};
