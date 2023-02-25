import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, Button, DialogContent, DialogActions, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

export const DialogButton = ({ ActionProps, action, title, children, disabled, open, toggleOpen, handleSave }) => {
  const classes = useStyles();

  // Fallback to the action label if no title is provided
  const dialogTitle = title || action;

  return (
    <React.Fragment>
      <Button {...ActionProps} onClick={() => toggleOpen(true)}>
        {action}
      </Button>
      <Dialog onClose={() => toggleOpen(false)} aria-labelledby={dialogTitle} open={open}>
        <DialogTitle id={dialogTitle}>{dialogTitle}</DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary" disabled={disabled}>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

DialogButton.defaultProps = {
  ActionProps: {
    color: 'secondary',
  },
};

DialogButton.propTypes = {
  action: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  handleSave: PropTypes.func.isRequired,
  title: PropTypes.string,
  ActionProps: PropTypes.object,
};
