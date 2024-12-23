import React from 'react';
import { Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { appBarHeight } from '@styles';

// Create the styles for this component
const useStyles = makeStyles(() => ({
  container: {
    height: `calc(100svh - ${appBarHeight}px)`,
  },
  emptyList: { display: 'flex', flexDirection: 'column' },
  emptyListText: { marginTop: 25 },
  emptyListImage: { height: 500 },
}));

/**
 * No Libraries component
 */
export const EmptyContainer = ({ image, label, height, width }) => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <Grid container className={classes.container} justifyContent="center" alignItems="center">
      <div className={classes.emptyList}>
        <img width={width} height={height} src={image} />
        <Typography align="center" variant="h5" className={classes.emptyListText}>
          {label}
        </Typography>
      </div>
    </Grid>
  );
};

EmptyContainer.defaultProps = {
  height: 500,
};
