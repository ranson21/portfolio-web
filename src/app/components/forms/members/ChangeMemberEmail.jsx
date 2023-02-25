// External Depedencies
import React, { useEffect, useState } from 'react';
import {
  Divider,
  Grid,
  TextField,
  Container,
  Typography,
  InputAdornment,
  Link,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Domain, FilterList as Filter } from '@material-ui/icons';

// Component Dependencies

// Store dependencies
import { ACCOUNTS } from 'app/graph/account';
import { findMember, findAccount } from 'app/utils/search';

// Style dependencies
import { DialogButton } from 'app/components/shared/DialogButton';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({}));

/**
 * Accounts Screen Component
 */
export const ChangeMemberEmail = ({ ActionProps }) => {
  const classes = useStyles();

  return (
    <DialogButton action="Change Email" ActionProps={ActionProps}>
      <div />
    </DialogButton>
  );
};
