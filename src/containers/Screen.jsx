import * as React from 'react';
import { Box, Toolbar, Container } from '@mui/material';

export function ScreenContainer({ children, containerStyles, wrapperStyles, containerId }) {
  return (
    <Box
      id={containerId}
      component="section"
      sx={{
        position: 'relative',
        display: 'flex',
        py: { xs: 6, md: 10 },
        ...containerStyles,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100svh',
          ...wrapperStyles,
        }}
      >
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
