// External Dependencies
import React from 'react';
import { Box, Link } from '@mui/material';

/**
 * Method to render the Application Logo
 * @param {object} props -- Props Contain User Details for AppBar
 */
export const Logo = () => {
  return (
    <Link href="#Home" underline="none" sx={{ zIndex: 100 }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '20px',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          border: '1px solid rgba(148, 163, 184, 0.14)',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.04), rgba(10, 14, 21, 0.88) 72%)',
          boxShadow: '0 14px 32px rgba(2, 8, 23, 0.4)',
        }}
      >
        <Box
          component="img"
          src="img/logo.png"
          alt="Abby Ranson logo"
          sx={{
            width: 62,
            height: 62,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Box>
    </Link>
  );
};
