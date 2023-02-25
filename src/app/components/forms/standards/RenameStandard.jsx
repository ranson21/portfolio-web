// External Depedencies
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useMutation } from '@apollo/client';

// Component Dependencies
import { Text } from 'app/components/forms/Controls';
import { BaseForm } from 'app/components/forms/Base';
import { DialogButton } from 'app/components/shared/DialogButton';

// Store dependencies
import { UPDATE_STANDARD } from 'app/graph/standard';
import { appAlert } from 'app/graph/local';

// Style dependencies

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({}));

/**
 * Accounts Screen Component
 */
export const RenameStandardForm = ({ ActionProps, id, name, refresh }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [updateStandard, { data, error, loading }] = useMutation(UPDATE_STANDARD, {
    update: cache => {
      cache.modify({
        fields: (value, details) => {},
      });
    },
  });
  const toggleOpen = value => setOpen(value);

  const update = ({ variables: { name } }) => {
    updateStandard({
      variables: {
        id,
        name,
      },
    });
  };

  useEffect(() => {
    if (!error && data) {
      console.log(data);
      appAlert({ level: 'success', message: `Successfully renamed ${id} standard` });
      refresh();
      setOpen(false);
    }
  }, [data, error]);

  return (
    <DialogButton
      open={open}
      toggleOpen={toggleOpen}
      handleSave={update}
      disabled={loading}
      title="Rename Standard"
      action="Rename Standard"
      ActionProps={ActionProps}
    >
      <React.Fragment>
        <BaseForm
          data={data}
          error={error}
          loading={loading}
          actionLabel="Rename"
          submit={update}
          requiredFields={['name']}
          initialValues={{ name }}
        >
          <Grid item xs={12}>
            {error && <Alert severity="error">{error?.message}</Alert>}
          </Grid>
          <Grid item xs={12}>
            <Text required name="name" label="Standard Name" />
          </Grid>
        </BaseForm>
      </React.Fragment>
    </DialogButton>
  );
};
