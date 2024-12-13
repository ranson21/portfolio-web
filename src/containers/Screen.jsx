import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Toolbar, Container } from '@mui/material';

export function ScreenContainer({ children, containerStyles, wrapperStyles, containerId }) {
  return (
    <Box id={containerId} sx={{ display: 'flex', ...containerStyles }}>
      <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh', ...wrapperStyles }}>
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
