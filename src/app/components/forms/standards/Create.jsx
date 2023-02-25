// External Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Button, Typography, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, gql } from '@apollo/client';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

// Store Dependencies
import { CREATE_STANDARD } from 'app/graph/standard';

// Componenet Dependencies
import { Text, Toggle } from 'app/components/forms/Controls';
import { BaseForm } from 'app/components/forms/Base';
import { Add, Close } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
  label: {
    fontWeight: 700,
  },
  remove: {
    margin: `${theme.spacing(2)}px 0`,
  },
  fieldsContainer: {
    paddingTop: theme.spacing(2),
  },
}));

/**
 * Login Form
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const CreateStandardForm = ({ user }) => {
  const classes = useStyles();
  const [creatStandard, { data, error, loading }] = useMutation(CREATE_STANDARD, {
    update: cache => {
      cache.modify({
        fields: (value, details) => {},
      });
    },
  });

  const history = useHistory();

  const handleSave = ({ variables: { name, fields } }) => {
    creatStandard({
      variables: {
        name,
        fields,
      },
    });
  };

  useEffect(() => {
    if (data) {
      history.push(`/standards/${data?.newStandard?.id}`);
    }
  }, [data]);

  const setUnique = ([field, value], state, utils) => {
    if (state.formState.values?.fields?.length <= 1) {
      return false;
    }
    const [index] = value.name.match(/\d+/);

    utils.changeValue(state, 'fields', fields => fields.map((field, idx) => ({ ...field, unique: idx === parseInt(index) })));
  };

  return (
    <Grid container className={classes.container}>
      <BaseForm
        data={data}
        error={error}
        loading={loading}
        actionLabel="Create Standard"
        user={user}
        submit={handleSave}
        requiredFields={['name', 'fields']}
        FormFields={({ handleSubmit, submitting, invalid, form: { mutators } }) => {
          return (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Text required name="name" label="Standard Name" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" classes={{ root: classes.label }}>
                    Fields
                  </Typography>
                  <Divider />
                  <FieldArray name="fields">
                    {({ fields }) =>
                      fields.map((name, index) => {
                        return (
                          <Grid container key={index} classes={{ root: classes.fieldsContainer }}>
                            <Grid item>
                              <Text required name={`${name}.name`} label={`Field ${index + 1} Name`} />
                            </Grid>
                            <Grid item>
                              <Toggle required name={`${name}.unique`} label="UID" onChange={mutators.setUnique} />
                            </Grid>
                            {fields.value[index].unique === false && (
                              <Grid item classes={{ root: classes.remove }}>
                                <IconButton size="small" onClick={() => fields.remove(index)}>
                                  <Close />
                                </IconButton>
                              </Grid>
                            )}
                          </Grid>
                        );
                      })
                    }
                  </FieldArray>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => mutators.push('fields', { name: '', unique: false })}
                    endIcon={<Add />}
                  >
                    New
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading || invalid || submitting}
                    endIcon={(loading || submitting) && <CircularProgress size={20} />}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
        mutators={{
          ...arrayMutators,
          setUnique,
        }}
        initialValues={{ fields: [{ unique: true, name: '' }] }}
      />
    </Grid>
  );
};
