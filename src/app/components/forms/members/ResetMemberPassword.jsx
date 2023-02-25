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
import { useMutation } from '@apollo/client';

// Component Dependencies

// Store dependencies
import { DELETE_MEMBER } from 'app/graph/members';
import { appAlert } from 'app/graph/local';
import { findMember, findAccount } from 'app/utils/search';

// Style dependencies
import { DialogButton } from 'app/components/shared/DialogButton';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router';
import { RESET_MEMBER_PASSWORD } from 'app/graph/members';
import { MemberCreated } from '../../members/MemberCreated';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({}));

/**
 * Accounts Screen Component
 */
export const ResetMemberPassword = ({ ActionProps, memberId }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [resetPassword, { data, error, loading }] = useMutation(RESET_MEMBER_PASSWORD, {
    update: cache => {
      cache.modify({
        fields: (value, details) => {},
      });
    },
  });

  const toggleOpen = value => setOpen(value);

  const handleSave = () => {
    resetPassword({
      variables: {
        uid: memberId,
      },
    });
  };

  return (
    <DialogButton
      open={open}
      toggleOpen={toggleOpen}
      handleSave={handleSave}
      disabled={loading}
      title="Are you sure you want reset this members password?"
      action="Reset Password"
      ActionProps={ActionProps}
    >
      <React.Fragment>
        {error && <Alert severity="error">{error?.message}</Alert>}
        {data ? (
          <MemberCreated member={data?.resetPassword} handleClose={() => toggleOpen(false)} />
        ) : (
          <Alert severity="info">
            Once you reset this members password a new temporary password will be generated and this member must reset it on their next sign
            in
          </Alert>
        )}
      </React.Fragment>
    </DialogButton>
  );
};
