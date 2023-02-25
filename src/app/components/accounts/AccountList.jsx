// External Depedencies
import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

// Component Dependencies
import { EmptyContainer } from 'app/components/shared/EmptyContainer';
import { PanelButton } from 'app/components/shared/PanelButton';

// Store dependencies

// Style dependencies
import { spacer } from 'app/styles';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    paddingTop: theme.spacing(4),
    color: theme.palette.textColor,
  },
}));

/**
 * Dashboard Screen Component
 */
export const AccountList = props => {
  // Create the styles for this screen
  const classes = useStyles();

  // Construct local state to handle the tab selection

  return (
    <Container className={classes.container}>
      <EmptyContainer
        image="img/empty-clients.png"
        label={
          <React.Fragment>
            <Typography>No Accounts Added</Typography>
            <PanelButton Icon={Add} label="Add Account">
              <div />
            </PanelButton>
          </React.Fragment>
        }
      />
    </Container>
  );
};
