// External Dependencies
import React from 'react';
import { Typography, Link } from '@mui/material';
import { APP_VERSION } from '@/version';

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {APP_VERSION}
      {'Copyright © '}
      <Link color="inherit" href="#/">
        Abby Ranson
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};
