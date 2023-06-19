// External Depedencies
import React from 'react';
import { Container, Toolbar, Box, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Style dependencies
import { EmptyContainer } from 'app/components';

// Create the dashboard screen styles
const useStyles = makeStyles(theme => ({}));

/**
 * Dashboard Screen Component
 */
export const Projects = props => {
  const classes = useStyles();

  return <EmptyContainer image="img/under_construction.png" />;
};

export default Projects;
