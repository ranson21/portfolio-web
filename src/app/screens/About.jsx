// External Depedencies
import React from 'react';
import { Container, Toolbar, Box, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Component Dependencies
import { EmptyContainer } from 'app/components';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    paddingTop: theme.spacing(4),
    color: theme.palette.textColor,
  },
}));

/**
 * Dashboard Screen Component
 */
export const About = props => {
  // Create the styles for this screen
  const classes = useStyles();

  return <EmptyContainer image="img/under_construction.png" />;
};

export default About;
