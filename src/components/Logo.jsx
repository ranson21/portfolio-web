// External Dependencies
import React from 'react';
import { Link } from '@mui/material';

/**
 * Method to render the Application Logo
 * @param {object} props -- Props Contain User Details for AppBar
 */
export const Logo = () => {
  return (
    <Link href="#" sx={{ zIndex: 100 }}>
      <img src={'img/logo.svg'} sx={{ height: 32 }} />
    </Link>
  );
};
