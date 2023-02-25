// External Dependencies
import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, CircularProgress, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

// Store Dependencies
import { LoadScreen } from 'app/screens/Loading';
import { LICENSES } from 'app/graph/members';

// Componenet Dependencies
import { LoadableDropDown } from 'app/components/forms/Controls';
import { LicensesForm } from 'app/components/forms/members/Licenses';
import { formatLicenses } from 'app/utils/format';

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
export const LicensesDropDown = ({ accountId, setValue, value }) => {
  const { loading, error, data } = useQuery(LICENSES, { variables: { accountId } });
  const options = data?.licenses?.length ? formatLicenses(data.licenses) : [];

  return <LoadableDropDown setValue={setValue} value={value} label="Licenses" loading={loading} error={error} data={options} />;
};
