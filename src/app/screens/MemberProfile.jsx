// External Depedencies
import React, { useEffect, useState } from 'react';
import {
  Divider,
  Grid,
  TextField,
  Container,
  Typography,
  InputAdornment,
  Link,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Domain, FilterList as Filter } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// Component Dependencies
import { parseURL } from 'app/utils/parser';
import { SomethingWentWrong } from 'app/components/shared/SomethingWentWrong';
import { LoadScreen } from 'app/screens/Loading';
import { Status } from 'app/components/shared/Status';
import { DetailCard } from 'app/components/shared/DetailCard';

// Store dependencies
import { MEMBERS } from 'app/graph/members';
import { ACCOUNTS } from 'app/graph/account';
import { findMember, findAccount } from 'app/utils/search';

// Style dependencies
import { breadCrumbHeight } from 'app/styles';
import { MemberDetails } from 'app/components/members/MemberDetails';
import { MemberApplications } from 'app/components/members/MemberApplications';
import { ChangeMemberEmail } from 'app/components/forms/members/ChangeMemberEmail';
import { DeleteMemberForm } from 'app/components/forms/members/DeleteMember';
import { ResetMemberPassword } from 'app/components/forms/members/ResetMemberPassword';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: `calc(100% - ${breadCrumbHeight}px)`,
  },
  panel: {
    padding: theme.spacing(2),
    width: 350,
    minHeight: 300,
  },
  label: {
    fontWeight: 700,
  },
  avatar: {
    height: 50,
    width: 50,
  },
  row: {
    padding: theme.spacing(2),
    width: '100%',
    minHeight: 100,
  },
  container: {
    flex: 1,
  },
  divider: {
    marginTop: theme.spacing(1),
  },
}));

/**
 * Accounts Screen Component
 */
export const MemberProfile = ({ user }) => {
  const { data: accountList } = useQuery(ACCOUNTS);
  const { loading, error, data } = useQuery(MEMBERS);
  const classes = useStyles();

  // Log the errors to the console for debugging
  if (error) {
    console.error(error);
  }

  const [currentRoute] = parseURL();
  const member = findMember(data?.members, currentRoute);

  const accountButtonProps = { disabled: member.email === user.email, color: 'secondary' };

  return loading ? (
    <LoadScreen />
  ) : (
    <Container classes={{ root: classes.root }}>
      {error ? (
        <SomethingWentWrong />
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <Paper classes={{ root: classes.panel }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Status label={member.licenses[0].role} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar classes={{ root: classes.avatar }}>
                        <AccountCircle />
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{member.displayName}</Typography>
                      <Typography variant="subtitle1">{member.email}</Typography>
                    </Grid>
                  </Grid>
                  <Divider classes={{ root: classes.divider }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar classes={{ root: classes.avatar }}>
                        <Domain />
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" classes={{ root: classes.label }}>
                        Account
                      </Typography>
                      <Typography variant="subtitle1">{findAccount(accountList?.accounts, member.accountId)?.name}</Typography>
                    </Grid>
                  </Grid>
                  <Divider classes={{ root: classes.divider }} />
                </Grid>
                <Grid item xs={12}>
                  <ChangeMemberEmail ActionProps={accountButtonProps} />
                </Grid>
                <Grid item xs={12}>
                  <Button color="secondary" disabled={member.email === user.email}>
                    Change Display Name
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <ResetMemberPassword ActionProps={accountButtonProps} memberId={member.uid} />
                </Grid>
                <Grid item xs={12}>
                  <DeleteMemberForm ActionProps={accountButtonProps} memberId={member.uid} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item classes={{ root: classes.container }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MemberDetails uid={member?.uid} />
              </Grid>
              <Grid item xs={12}>
                <MemberApplications uid={member?.uid} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default MemberProfile;
