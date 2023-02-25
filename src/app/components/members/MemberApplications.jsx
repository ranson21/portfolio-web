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
import { ApplicationCard } from 'app/components/members/ApplicationCard';

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
export const MemberApplications = ({ uid }) => {
  const { loading, error, data } = useQuery(MEMBER, { variables: { uid } });
  const classes = useStyles();

  // Log the errors to the console for debugging
  if (error) {
    console.error(error);
  }

  return (
    <DetailCard label="Applications">
      {loading ? (
        <LoadScreen />
      ) : (
        <Grid container spacing={2} classes={{ root: classes.container }}>
          {data?.member?.licenses.map(license => (
            <ApplicationCard key={license.application} app={license.application} endDate={license.endDate} role={license.role} />
          ))}
        </Grid>
      )}
    </DetailCard>
  );
};
