import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Drawer, Typography, Divider, Grid, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

// Style Dependencies
import { rightDrawerWidth } from 'app/styles';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: rightDrawerWidth,
  },
  label: {
    flex: 1,
    padding: 10,
  },
  labelContainer: {
    padding: 10,
    flex: 0,
    display: 'flex',
  },
}));

export const FabButton = ({ label, onClick, Icon }) => {
  return (
    <Fab variant="extended" color="primary" onClick={onClick}>
      <Icon /> {label}
    </Fab>
  );
};

export const PanelButton = ({ children, Icon, label, ActionButton }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ActionButton label={label} Icon={Icon} onClick={() => setOpen(true)} />
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Grid container direction="column" wrap="nowrap" classes={{ container: classes.container }}>
          <Grid item xs={12} classes={{ root: classes.labelContainer }}>
            <Typography variant="h6" component="span" classes={{ root: classes.label }}>
              {label}
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            {children}
          </Grid>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
};

PanelButton.defaultProps = {
  ActionButton: FabButton,
};
