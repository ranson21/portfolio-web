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
import { SomethingWentWrong } from 'app/components/shared/SomethingWentWrong';
import { LoadScreen } from 'app/screens/Loading';
import { DetailCard } from 'app/components/shared/DetailCard';

// Store dependencies
import { MEMBER } from 'app/graph/members';
import { formatDate } from '../../utils/format';

// Style dependencies

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  container: {
    margin: `${theme.spacing(2)}px 0`,
  },
  label: {
    fontWeight: 700,
  },
}));

/**
 * Accounts Screen Component
 */
export const MemberDetails = ({ uid }) => {
  const { loading, error, data } = useQuery(MEMBER, { variables: { uid } });
  const classes = useStyles();

  // Log the errors to the console for debugging
  if (error) {
    console.error(error);
  }

  return (
    <DetailCard label="Details">
      {loading ? (
        <LoadScreen />
      ) : (
        <Grid container spacing={2} classes={{ root: classes.container }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" classes={{ root: classes.label }}>
              Member Since
            </Typography>
            <Typography variant="body2">{formatDate(data?.member.createdAt)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" classes={{ root: classes.label }}>
              Last Login
            </Typography>
            <Typography variant="body2">
              {data?.member?.lastLogin ? formatDate(data?.member.lastLogin) : 'Member has never logged in'}
            </Typography>
          </Grid>
        </Grid>
      )}
    </DetailCard>
  );
};
