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
import { Domain, FilterList as Filter } from '@material-ui/icons';
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
import { findAccountByName } from 'app/utils/search';
import { ACCOUNTS } from 'app/graph/account';

// Style dependencies
import { breadCrumbHeight } from 'app/styles';

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
}));

/**
 * Accounts Screen Component
 */
export const AccountProfile = props => {
  const { loading, error, data } = useQuery(ACCOUNTS);
  const classes = useStyles();

  // Log the errors to the console for debugging
  if (error) {
    console.error(error);
  }
  const [currentRoute] = parseURL();
  const account = findAccountByName(data?.accounts, currentRoute);

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
                  <Status label={account.status} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar classes={{ root: classes.avatar }}>
                        <Domain />
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{account.name}</Typography>
                      <Typography variant="subtitle1">{account.type}</Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" classes={{ root: classes.label }}>
                    Account Administrators
                  </Typography>
                  <List disablePadding>
                    <ListItem divider>
                      <ListItemText primary="Stephen Halliburton" secondary="sah@nimbusark.com" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Button color="secondary" disabled={account.type === 'Owner'}>
                    Rename Account
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button color="secondary" disabled={account.type === 'Owner'}>
                    Delete Account
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item classes={{ root: classes.container }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DetailCard label="Features">
                  <div />
                </DetailCard>
              </Grid>
              <Grid item xs={12}>
                <DetailCard label="Licenses">
                  <div />
                </DetailCard>
              </Grid>
              <Grid item xs={12}>
                <DetailCard label="Members">
                  <div />
                </DetailCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default AccountProfile;
