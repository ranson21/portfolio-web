// External Dependencies
import React from 'react';
import { FormControl, InputLabel, Select, CircularProgress, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

// Store Dependencies
import { ACCOUNTS } from 'app/graph/account';

// Componenet Dependencies
import { LoadableDropDown } from 'app/components/forms/Controls';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

/**
 * NewMember Container
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const AccountsDropDown = ({ setValue, value }) => {
  const { loading, error, data } = useQuery(ACCOUNTS);

  return (
    <LoadableDropDown
      setValue={setValue}
      label="Account"
      loading={loading}
      error={error}
      data={data?.accounts?.map(account => ({ id: account.uid, name: account.name }))}
      value={value}
    />
  );
};
