// External Dependencies
import React from 'react';
import { Toolbar, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

// Component Dependencies
import { AppBar } from 'app/components/AppBar';
import { Copyright } from 'app/components/Copyright';
import { ErrorBoundary } from 'app/components/ErrorBoundary';
import { appBarHeight } from 'app/styles';

// Create the styles for the private layout
export const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - ${appBarHeight}px)`,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    [theme.breakpoints.down('sm')]: {
      bottom: 'auto',
    },
  },
}));

/**
 * Private Layout component wraps an application screen with the SideNav and TopBar
 * @param {Object} props -- Contains the screen to wrap in the layout
 */
export const AppContainer = ({ Screen, ...props }) => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <React.Fragment>
      <ErrorBoundary component="AppBar">
        <AppBar {...props} />
      </ErrorBoundary>
      <Toolbar />
      <ErrorBoundary component="Screen">
        <Screen {...props} />
      </ErrorBoundary>
      <ErrorBoundary component="Footer">
        <footer className={classes.footer}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item sx={{ marginRight: 3, marginBottom: 3 }}>
              <Copyright />
            </Grid>
          </Grid>
        </footer>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default AppContainer;
