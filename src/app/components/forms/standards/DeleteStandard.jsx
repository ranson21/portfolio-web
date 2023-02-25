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
import { DELETE_STANDARD } from 'app/graph/standard';
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
export const DeleteStandardForm = ({ ActionProps, id, name }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = value => setOpen(value);

  const classes = useStyles();
  const [removeStandard, { data, error, loading }] = useMutation(DELETE_STANDARD, {
    update: cache => {
      cache.modify({
        fields: (value, details) => {},
      });
    },
  });
  const history = useHistory();

  const deleteStandard = () => {
    removeStandard({
      variables: {
        id,
      },
    });
  };

  console.log(id);

  useEffect(() => {
    if (!error && data) {
      appAlert({ level: 'success', message: `Successfully removed ${name} standard` });
      setOpen(false);
      history.push('/standards');
    }
  }, [data, error]);

  return (
    <DialogButton
      open={open}
      toggleOpen={toggleOpen}
      handleSave={deleteStandard}
      disabled={loading}
      title="Are you sure you want to delete this standard?"
      action="Delete Standard"
      ActionProps={ActionProps}
    >
      <React.Fragment>
        {error && <Alert severity="error">{error?.message}</Alert>}
        <Alert severity="warning">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                Deleting a Standard is permanent and cannot be reversed. All data associated with this standard will be removed and cannot
                be recovered.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <strong>NOTE:</strong> If there are any engagements associated with this standard, you will be unable to remove the standard
                in order to preserve data integrity.
              </Typography>
            </Grid>
          </Grid>
        </Alert>
      </React.Fragment>
    </DialogButton>
  );
};
