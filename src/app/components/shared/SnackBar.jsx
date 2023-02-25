// External Dependencies
import React from 'react';
import { Button, Grid, IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// Style Dependencies
import { panelDrawerWidth, spacer } from 'app/styles';

// Create the styles for the snack bar
export const useStyles = makeStyles(() => ({
  spacer,
  snackBar: {
    minWidth: panelDrawerWidth,
    marginLeft: panelDrawerWidth,
  },
  snackBarFull: {
    marginLeft: 0,
  },
  icon: {
    '& > svg': {
      border: '0 !important',
    },
  },
  fullWidth: {
    width: '100%',
  },
}));

/**
 * Snack Bar Component displays messages when dropped
 * @param {Object} param0
 */
export const SnackBar = ({ message, dismissNotification, level, toolboxOpen, undo }) => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <Snackbar
      classes={{ root: clsx(classes.snackBar, { [classes.snackBarFull]: !toolboxOpen }) }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(message)}
      autoHideDuration={4000}
      onClose={dismissNotification}
    >
      <Alert severity={level} classes={{ icon: classes.icon, message: classes.fullWidth, root: classes.fullWidth }}>
        <Grid container>
          <Grid item>{message}</Grid>
          <Grid item classes={{ root: classes.spacer }} />
          <Button variant="contained" color="primary" size="small" onClick={undo}>
            UNDO
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={dismissNotification} classes={{ label: classes.icon }}>
            <CloseIcon fontSize="small" classes={{ root: classes.icon }} />
          </IconButton>
        </Grid>
      </Alert>
    </Snackbar>
  );
};
