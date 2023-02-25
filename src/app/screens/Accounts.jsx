// External Depedencies
import React, { useState } from 'react';
import { Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import { useQuery } from '@apollo/client';

// Component Dependencies
import { BaseContainer } from 'app/components/shared/BaseContainer';
import { DataTable } from 'app/components/shared/DataTable';
import { Status } from 'app/components/shared/Status';
import { Toolbar } from 'app/components/shared/DataTableToolbar';
import { PanelButton } from 'app/components/shared/PanelButton';
import { CreateAccountForm } from 'app/components/forms/accounts/Create';

// Store dependencies
import { ACCOUNTS } from 'app/graph/account';
import { formatDate, formatDisplayName } from 'app/utils/format';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({}));

const columns = [
  { field: 'uid', headerName: 'ID', width: 300, hide: true },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    renderCell: params => <Link href={`#/accounts/${formatDisplayName(params.value)}`}>{params.value}</Link>,
  },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'status', headerName: 'Status', width: 150, renderCell: params => <Status label={params.value} /> },
  { field: 'createdAt', headerName: 'Creation Date', width: 250, renderCell: params => formatDate(params.value) },
];

/**
 * Accounts Screen Component
 */
export const Accounts = props => {
  const { loading, error, data, refetch } = useQuery(ACCOUNTS);
  const classes = useStyles();
  const [filtering, setFiltering] = useState(false);

  const handleFilter = params => {
    setFiltering(params.rows.size !== params.visibleRows.size);
  };

  return (
    <BaseContainer loading={loading} error={error} data={data}>
      <DataTable
        handleFilter={handleFilter}
        Toolbar={props => (
          <Toolbar
            {...props}
            filtering={filtering}
            label="Accounts"
            Actions={() => (
              <React.Fragment>
                <PanelButton
                  label="Create Account"
                  ActionButton={({ label, onClick }) => {
                    return (
                      <Button onClick={onClick} color="secondary" startIcon={<Add />}>
                        {label}
                      </Button>
                    );
                  }}
                >
                  <CreateAccountForm {...props} refresh={refetch} />
                </PanelButton>
              </React.Fragment>
            )}
          />
        )}
        rows={data?.accounts?.map(account => ({ ...account, id: account.uid }))}
        columns={columns}
      />
    </BaseContainer>
  );
};

export default Accounts;
