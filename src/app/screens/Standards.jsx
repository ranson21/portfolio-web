// External Depedencies
import React, { useEffect, useState } from 'react';
import { Divider, Grid, TextField, Container, Typography, InputAdornment, Link, Button, Chip } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Add, FilterList as Filter } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// Component Dependencies
import { SomethingWentWrong } from 'app/components/shared/SomethingWentWrong';
import { PanelButton } from 'app/components/shared/PanelButton';
import { LoadScreen } from 'app/screens/Loading';
import { DataTable } from 'app/components/shared/DataTable';
import { Toolbar } from 'app/components/shared/DataTableToolbar';
import { CreateStandardForm } from 'app/components/forms/standards/Create';

// Store dependencies
import { formatDate } from 'app/utils/format';
import { STANDARDS } from 'app/graph/standard';

// Style dependencies
import { spacer, appBarHeight, breadCrumbHeight } from 'app/styles';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  spacer,
  menuButton: {
    margin: theme.spacing(1),
  },
  dashboard: {
    height: '100%',
    paddingTop: theme.spacing(4),
    color: theme.palette.textColor,
  },
  container: {
    height: '100%',
  },
  filterContainer: {
    flex: 0,
  },
  filter: {
    marginTop: 10,
  },
  root: {
    // height: '100%',
    marginTop: appBarHeight,
    height: `calc(100% - ${appBarHeight}px - ${breadCrumbHeight}px)`,
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 150, hide: true },
  {
    field: 'label',
    headerName: 'Name',
    width: 150,
    renderCell: params => <Link href={`#/standards/${params.value.id}`}>{params.value.name}</Link>,
  },
  { field: 'version', headerName: 'Version', width: 150, hide: true },
  {
    field: 'fields',
    headerName: 'Fields',
    width: 150,
    renderCell: params => <Chip label={params.value.length} />,
  },
  {
    field: 'controls',
    headerName: 'Number of Controls',
    width: 250,
    renderCell: params => params.value?.length || '0',
  },
  { field: 'createdAt', headerName: 'Creation Date', width: 250, renderCell: params => formatDate(params.value) },
];

/**
 * Standards Screen Component
 */
export const Standards = props => {
  const { loading, error, data } = useQuery(STANDARDS);
  const classes = useStyles();
  const [filtering, setFiltering] = useState(false);

  const handleFilter = params => {
    setFiltering(params.rows.size !== params.visibleRows.size);
  };

  // Log the errors to the console for debugging
  if (error) {
    console.error(error);
  }

  return loading ? (
    <LoadScreen />
  ) : (
    <Container classes={{ root: classes.root }}>
      {error ? (
        <SomethingWentWrong />
      ) : (
        <DataTable
          handleFilter={handleFilter}
          Toolbar={props => (
            <Toolbar
              {...props}
              filtering={filtering}
              label="Standards"
              Actions={() => (
                <React.Fragment>
                  <PanelButton
                    label="Create Standard"
                    ActionButton={({ label, onClick }) => {
                      return (
                        <Button onClick={onClick} color="secondary" startIcon={<Add />}>
                          {label}
                        </Button>
                      );
                    }}
                  >
                    <CreateStandardForm {...props} />
                  </PanelButton>
                </React.Fragment>
              )}
            />
          )}
          rows={data?.standards.map(standard => ({ ...standard, label: { id: standard.id, name: standard.name } }))}
          columns={columns}
        />
      )}
    </Container>
  );
};

export default Standards;
