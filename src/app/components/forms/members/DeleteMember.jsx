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

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({}));

/**
 * Accounts Screen Component
 */
export const DeleteMemberForm = ({ ActionProps, memberId }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [removeMember, { data, error, loading }] = useMutation(DELETE_MEMBER, {
    update: cache => {
      cache.modify({
        fields: (value, details) => {},
      });
    },
  });
  const history = useHistory();

  const toggleOpen = value => setOpen(value);

  const deleteMember = () => {
    removeMember({
      variables: {
        uid: memberId,
      },
    });
  };

  useEffect(() => {
    if (!error && data) {
      appAlert({ level: 'success', message: `Successfully removed ${memberId}` });
      setOpen(false);
      history.push('/members');
    }
  }, [data, error]);

  return (
    <DialogButton
      open={open}
      toggleOpen={toggleOpen}
      handleSave={deleteMember}
      disabled={loading}
      title="Are you sure you want to delete this member?"
      action="Delete Member"
      ActionProps={ActionProps}
    >
      <React.Fragment>
        {error && <Alert severity="error">{error?.message}</Alert>}
        <Alert severity="warning">
          Deleting a member is permanent and cannot be reversed. All data associated with this member will be removed and cannot be
          recovered. Once successfully removed, the license that was assigned to this member will become available for re-assignment
        </Alert>
      </React.Fragment>
    </DialogButton>
  );
};
