// External Depedencies
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';

// Style dependencies
import { appBarHeight } from 'app/styles';
import {
  GridColumnsToolbarButton,
  GridDensitySelector,
  GridFilterToolbarButton,
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  toolbar: {
    height: appBarHeight + theme.spacing(2),
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  label: {
    margin: theme.spacing(1),
  },
  filterLabel: {
    color: lighten('#000', 0.5),
  },
}));

export const Toolbar = ({ label, filtering, Actions }) => {
  const classes = useStyles();

  const filterLabel = filtering ? `Filtering ${label.toLowerCase()}` : `Showing all ${label.toLowerCase()}`;

  return (
    <Grid container>
      <Grid item xs={12} classes={{ root: classes.toolbar }}>
        <Grid container spacing={2} classes={{ root: classes.label }}>
          <Grid item>
            <Typography variant="h6" component="span">
              {label}
            </Typography>
            <Typography variant="subtitle1" component="span" classes={{ root: classes.filterLabel }}>
              {' '}
              | {filterLabel}
            </Typography>
          </Grid>
          <Grid item>{Actions && <Actions />}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <GridToolbarContainer>
          <GridColumnsToolbarButton />
          <GridFilterToolbarButton />
          <GridDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
      </Grid>
    </Grid>
  );
};
