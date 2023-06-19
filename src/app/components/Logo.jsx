// External Dependencies
import React from 'react';
import { Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Create the Logo Styles
const useStyles = makeStyles(theme => ({
  image: {
    height: 32,
  },
}));

/**
 * Method to render the Application Logo
 * @param {object} props -- Props Contain User Details for AppBar
 */
export const Logo = () => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <Link href="#" sx={{ zIndex: 100 }}>
      <img src={'img/logo.svg'} className={classes.image} />
    </Link>
  );
};
