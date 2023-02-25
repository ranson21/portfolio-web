// External Dependencies
import React, { useState } from 'react';
import { Button, Divider, Grid, Slide, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useQuery } from '@apollo/client';

// Store Dependencies
import { LICENSES } from 'app/graph/members';

// Component Dependencies
import { AccountsDropDown } from 'app/components/forms/dropdowns/Accounts';
import { LicensesDropDown } from 'app/components/forms/dropdowns/Licenses';
import { LicensesForm } from 'app/components/forms/members/Licenses';
import { formatLicenses } from 'app/utils/format';
import { findLicense } from 'app/utils/search';
import { CreateMemberForm } from 'app/components/forms/members/Create';
import { MemberCreated } from 'app/components/members/MemberCreated';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
  label: {
    fontWeight: 700,
  },
}));

/**
 * NewMember Container
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const NewMember = ({ user, refreshMembers }) => {
  const classes = useStyles();
  const [accountId, setAccountId] = useState(user.accountId);
  const [license, setLicense] = useState(null);
  const [member, setMember] = useState(null);
  const [fetching, fetchMembers] = useState(false);

  const { data } = useQuery(LICENSES, { variables: { accountId } });

  // Set the flag to determine whether there is an available license
  const licenseAvailable = Boolean(formatLicenses(data?.licenses || []).length) !== false;

  // Get the license ID
  const licenseId = licenseAvailable && findLicense(data?.licenses, license ? license.uid : data.licenses[0].role);

  const refresh = () => {
    fetchMembers(true);
    refreshMembers();
  };

  return (
    <Grid container className={classes.container} spacing={2}>
      {member ? (
        <MemberCreated member={member} handleClose={refresh} fetching={fetching} />
      ) : (
        <React.Fragment>
          <Grid item xs={12}>
            <AccountsDropDown value={accountId} setValue={setAccountId} />
          </Grid>
          {accountId && data && (
            <React.Fragment>
              {!licenseAvailable && (
                <Grid item xs={12}>
                  <Alert severity="info">There are no licenses available. Add more now to create a new Member</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                {licenseAvailable ? (
                  <LicensesDropDown accountId={accountId} value={license?.role || data?.licenses[0].role} setValue={setLicense} />
                ) : (
                  <LicensesForm accountId={accountId} user={user} />
                )}
              </Grid>
              {licenseId && (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" classes={{ root: classes.label }}>
                      Details
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <CreateMemberForm accountId={accountId} licenseId={licenseId} setMember={setMember} />
                  </Grid>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </Grid>
  );
};
