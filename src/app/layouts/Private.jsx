// External Dependencies
import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Component Dependencies
import { AppBar } from 'app/components/layout/AppBar';
import { ErrorBoundary } from 'app/components/shared/ErrorBoundary';

// Store Dependencies

// Style Dependencies
import { leftDrawerWidth, appBarHeight, panelDrawerWidth } from 'app/styles';

// Create the styles for the private layout
export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - ${appBarHeight}px)`,
  },
  contentShiftLeft: {
    marginLeft: leftDrawerWidth,
  },
  contentShiftRight: {
    marginRight: panelDrawerWidth,
  },
  noSideNav: {
    padding: 0,
    marginLeft: 0,
  },
}));

/**
 * Private Layout component wraps an application screen with the SideNav and TopBar
 * @param {Object} props -- Contains the screen to wrap in the layout
 */
export const PrivateLayout = ({ Screen, ...props }) => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Top Level */}
      <ErrorBoundary component="AppBar">
        <AppBar {...props} />
      </ErrorBoundary>

      {/* Main Body */}
      <main className={clsx(classes.content, {})}>
        <ErrorBoundary component="Screen">
          <Screen {...props} />
        </ErrorBoundary>
      </main>
    </div>
  );
};
