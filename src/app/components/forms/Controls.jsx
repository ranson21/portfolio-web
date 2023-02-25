// External Dependencies
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  FormLabel,
  Grid,
  CircularProgress,
  MenuItem,
  Switch,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';

// Create the Auth Form Styles
export const useStyles = makeStyles(theme => ({
  margin: {
    marginLeft: 0,
    margin: theme.spacing(1),
  },
  formControl: {
    width: '100%',
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  colorLabel: {
    margin: 0,
    width: '100%',
    alignItems: 'flex-start',
    padding: `0 ${theme.spacing(1)}px`,
  },
  colorInput: {
    height: 36,
    width: '100%',
  },
}));

/**
 * Text Field Form component
 * @param {Object} props -- Contains form meta and field props
 */
export const Text = ({ name, fieldProps, mask, ...custom }) => {
  const classes = useStyles();

  return (
    <Field name={name} {...fieldProps}>
      {({ input, meta: { touched, error } }) => {
        const Control = controlProps => (
          <TextField
            {...controlProps}
            fullWidth
            error={touched && Boolean(error)}
            helperText={touched && error}
            name={name}
            variant="outlined"
            id={name}
            autoComplete={name}
            {...custom}
          />
        );

        return mask ? (
          <InputMask disabled={mask === undefined} mask={mask} {...input}>
            {InputProps => Control(InputProps)}
          </InputMask>
        ) : (
          Control(input)
        );
      }}
    </Field>
  );
};

/**
 * Text Field Form component
 * @param {Object} props -- Contains form meta and field props
 */
export const Toggle = ({ name, fieldProps, label, onChange, ...custom }) => {
  return (
    <Field {...fieldProps} name={name} type="checkbox">
      {({ input, meta: { touched, error } }) => {
        return (
          <FormControlLabel
            labelPlacement="top"
            control={<Switch checked={input?.checked ? true : false} onChange={event => onChange(event, input)} />}
            label={label}
          />
        );
      }}
    </Field>
  );
};

/**
 * Text Field Form component
 * @param {Object} props -- Contains form meta and field props
 */
export const ColorPicker = ({ name, fieldProps, label, onChange, ...custom }) => {
  const classes = useStyles();

  return (
    <Field {...fieldProps} name={name} type="color">
      {({ input, meta: { touched, error } }) => {
        return (
          <FormControlLabel
            labelPlacement="top"
            control={<input {...input} type="color" className={classes.colorInput} />}
            classes={{ root: classes.colorLabel }}
            label={label}
          />
        );
      }}
    </Field>
  );
};

/**
 * Check Box Form component
 * @param {Object} props -- Contains form meta and field props
 */
export const Check = ({ input, label }) => (
  <div>
    <FormControlLabel control={<Checkbox checked={input?.value ? true : false} onChange={input?.onChange} />} label={label} />
  </div>
);

/**
 * Radio Button Form component
 * @param {Object} props -- Contains form meta and field props
 */
export const RadioButton = ({ input, options, label, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormLabel component="legend">
          <b>{label}</b>
        </FormLabel>
        <Grid cointainer>
          {options.map(option => (
            <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

/**
 * Form Helper Form component renders errors when present
 * @param {Object} props -- Contains form meta and field props
 */
export const FormHelper = ({ touched, error }) => touched && Boolean(error) && <FormHelperText>{touched && error}</FormHelperText>;

/**
 * Dropdown Form component
 * @param {Object} props -- Contains form meta and field props
 */
export const SelectField = ({ id, name, label, fieldProps, children, ...custom }) => {
  const classes = useStyles();
  return (
    <Field name={name} className={classes.formControl} {...fieldProps}>
      {({ input, meta: { touched, error } }) => (
        <FormControl error={touched && error} fullWidth variant="outlined">
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select {...custom} {...input} id={id} labelId={`${id}-label`} label={label} error={Boolean(error)}>
            {children}
          </Select>
          <FormHelper touched={touched} error={error} />
        </FormControl>
      )}
    </Field>
  );
};

export const LoadableDropDown = ({ loading, error, data, label, value, setValue }) => {
  const classes = useStyles();

  const options = data?.length ? data : [{ id: '', name: 'No Items to Display' }];

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="loadable-dropdown">{label}</InputLabel>
      <Select
        labelId="loadable-dropdown"
        label={label}
        value={value}
        onChange={setValue}
        error={Boolean(error)}
        endAdornment={loading && <CircularProgress size={20} />}
      >
        {loading ? (
          <MenuItem value="">Loading...</MenuItem>
        ) : (
          options?.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};
