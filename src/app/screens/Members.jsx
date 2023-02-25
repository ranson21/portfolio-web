// External Depedencies
import React, { useState } from 'react';
import { Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import { useQuery } from '@apollo/client';

// Component Dependencies
import { BaseContainer } from 'app/components/shared/BaseContainer';
import { DataTable } from 'app/components/shared/DataTable';
import { Toolbar } from 'app/components/shared/DataTableToolbar';
import { PanelButton } from 'app/components/shared/PanelButton';
import { NewMember } from 'app/components/members/NewMember';

// Store dependencies
import { MEMBERS } from 'app/graph/members';
import { formatDate, formatDisplayName } from 'app/utils/format';
import { findAccount } from 'app/utils/search';

import { ACCOUNTS } from 'app/graph/account';

// Style dependencies

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({}));

const columns = [
  { field: 'uid', headerName: 'ID', width: 150, hide: true },
  {
    field: 'displayName',
    headerName: 'Name',
    width: 150,
    renderCell: params => <Link href={`#/members/${formatDisplayName(params.value)}`}>{params.value}</Link>,
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'account', headerName: 'Account', width: 130, renderCell: params => params.value?.name },
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
  },
  { field: 'createdAt', hide: true, headerName: 'Creation Date', width: 200, renderCell: params => formatDate(params.value) },
  {
    field: 'licenseExpiry',
    headerName: 'License Expiration',
    width: 200,
    renderCell: params => (params.value ? formatDate(params.value) : ''),
  },
];

/**
 * Members Screen Component
 */
export const Members = props => {
  const { data: accountList } = useQuery(ACCOUNTS);
  const { loading, error, data, refetch } = useQuery(MEMBERS);
  const classes = useStyles();
  const [filtering, setFiltering] = useState(false);

  const handleFilter = params => {
    setFiltering(params.rows.size !== params.visibleRows.size);
  };

  return (
    <React.Fragment>
      <BaseContainer loading={loading} error={error} data={data}>
        <DataTable
          handleFilter={handleFilter}
          Toolbar={toolbarProps => (
            <Toolbar
              {...toolbarProps}
              filtering={filtering}
              label="Members"
              Actions={() => (
                <React.Fragment>
                  <PanelButton
                    label="Create Member"
                    ActionButton={({ label, onClick }) => {
                      return (
                        <Button onClick={onClick} color="secondary" startIcon={<Add />}>
                          {label}
                        </Button>
                      );
                    }}
                  >
                    <NewMember {...props} refreshMembers={refetch} />
                  </PanelButton>
                </React.Fragment>
              )}
            />
          )}
          rows={data?.members?.map(member => ({
            ...member,
            role: member.licenses ? member.licenses[0]?.role : '',
            account: findAccount(accountList?.accounts, member.accountId),
            licenseExpiry: member.licenses ? member.licenses[0]?.endDate : '',
            id: member.uid,
          }))}
          columns={columns}
        />
      </BaseContainer>
    </React.Fragment>
  );
};

export default Members;
