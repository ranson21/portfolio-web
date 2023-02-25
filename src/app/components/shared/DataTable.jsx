import React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

// Create the styles for this component
const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
  },
  emptyList: { display: 'flex', flexDirection: 'column' },
  emptyListText: { marginTop: 25 },
  emptyListImage: { height: 300 },
}));

export const DataTable = ({ columns, rows, handleFilter, Toolbar }) => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DataGrid
        onFilterModelChange={handleFilter}
        checkboxSelection
        rows={rows}
        columns={columns}
        components={{
          Toolbar,
        }}
      />
    </div>
  );
};
