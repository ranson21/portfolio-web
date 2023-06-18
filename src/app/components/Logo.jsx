// External Dependencies
import React from 'react';
import { Button, Link, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

// Create the Logo Styles
export const useStyles = makeStyles(theme => ({
  image: {
    height: 32,
  },
}));

/**
 * Method to render the Application Logo
 * @param {object} props -- Props Contain User Details for AppBar
 */
export default () => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <Link href="#" sx={{ zIndex: 100 }}>
      <img src={'img/logo.svg'} className={classes.image} />
    </Link>
  );
};
