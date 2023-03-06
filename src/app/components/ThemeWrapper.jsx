// External Dependencies
import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Method to wrap the application with a theme
 * @param {Object} props -- Contains the component children and user settings
 */
export const ThemeWrapper = ({ children, ...props }) => {
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: { default: '#282828' },
      primary: {
        main: '#AAEEFF',
      },
      secondary: {
        main: '#895593',
      },
    },
  });

  return (
    <ThemeProvider {...props} theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
