// External Depedencies
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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
import { Assignment, Domain, FilterList as Filter } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// Component Dependencies
import { parseURL } from 'app/utils/parser';
import { SomethingWentWrong } from 'app/components/shared/SomethingWentWrong';
import { LoadScreen } from 'app/screens/Loading';
import { Status } from 'app/components/shared/Status';
import { ControlsList } from 'app/components/standards/Controls';
import { DeleteStandardForm } from 'app/components/forms/standards/DeleteStandard';
import { RenameStandardForm } from 'app/components/forms/standards/RenameStandard';

// Store dependencies
import { CONTROLS } from 'app/graph/standard';
import { findStandard } from 'app/utils/search';

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
  divider: {
    marginTop: theme.spacing(1),
  },
  header: {
    margin: theme.spacing(1),
  },
  content: {
    height: '100%',
  },
  emptyContainer: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    marginBottom: `-${theme.spacing(1)}px`,
  },
}));

/**
 * Accounts Screen Component
 */
export const StandardDetails = ({ user }) => {
  const [currentRoute] = parseURL();
  const { loading, error, data, refetch } = useQuery(CONTROLS, { variables: { standardId: currentRoute } });
  const classes = useStyles();
  const standard = data?.controls;

  // Log the errors to the console for debugging
  if (error) {
    console.error(error);
  }

  useEffect(() => {}, [data]);

  return loading ? (
    <LoadScreen />
  ) : (
    <Container classes={{ root: classes.root }}>
      {error ? (
        <SomethingWentWrong />
      ) : (
        <Grid container spacing={2} classes={{ root: classes.content }}>
          <Grid item>
            <Paper classes={{ root: classes.panel }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Status label={`Version: ${standard.version}`} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar classes={{ root: classes.avatar }}>
                        <Assignment />
                      </Avatar>
                    </Grid>
                    <Grid item classes={{ root: classes.header }}>
                      <Typography variant="h5">{standard.name}</Typography>
                    </Grid>
                  </Grid>
                  <Divider classes={{ root: classes.divider }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" classes={{ root: classes.label }}>
                        Fields
                      </Typography>
                    </Grid>
                    {standard.fields?.map(field => (
                      <Grid item key={field?.name} xs={12}>
                        <Chip color="primary" label={field?.name} />
                      </Grid>
                    ))}
                  </Grid>
                  <Divider classes={{ root: classes.divider }} />
                </Grid>
                <Grid item xs={12}>
                  <RenameStandardForm id={currentRoute} name={standard.name} refresh={refetch} />
                </Grid>
                <Grid item xs={12}>
                  <DeleteStandardForm id={currentRoute} name={standard.name} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            classes={{
              root: clsx(classes.container, {
                [classes.emptyContainer]: !Boolean(standard.controls?.length),
              }),
            }}
          >
            <Grid container spacing={2} classes={{ root: classes.content }}>
              <ControlsList
                standard={standard}
                refresh={refetch}
                standardId={currentRoute}
                fields={standard?.fields}
                controls={standard?.controls}
                primaryField={standard?.fields?.filter(field => field?.unique)[0]}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default StandardDetails;
