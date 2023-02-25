import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { capitalize } from '@material-ui/core/utils';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
  },
  pending: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.warning.main,
  },
}));

export const Status = ({ label }) => {
  const classes = useStyles();

  return (
    <Chip
      className={clsx(classes.chip, {
        [classes.active]: label === 'active',
        [classes.pending]: label === 'pending',
      })}
      label={capitalize(label)}
    />
  );
};
