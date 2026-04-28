// External Dependencies
import React from 'react';
import { Typography, Link } from '@mui/material';
import { APP_VERSION } from '@/version';

export const Copyright = () => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  // Use an en-dash range when we've passed the start year; plain year otherwise.
  const yearRange = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {`Copyright © ${yearRange} `}
      <Link color="inherit" href="#/">
        Abby Ranson
      </Link>
      {` · v${APP_VERSION}`}
    </Typography>
  );
};
