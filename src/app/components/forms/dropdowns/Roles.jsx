// External Dependencies
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'react-final-form';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
}));

export const ROLES = ['Admin', 'Manager', 'Auditor'];

/**
 * NewMember Container
 * @param {Object} props -- Contains the Firebase Authentication
 * @returns {Component} -- Authentication Form Component
 */
export const RolesDropDown = ({ updateState, accountId }) => {
  const classes = useStyles();

  return (
    <Field name="role">
      {({ input, meta: { touched, error } }) => (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="role-dropdown">Role</InputLabel>
          <Select {...input} labelId="role-dropdown" label="Role">
            {ROLES?.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  );
};
