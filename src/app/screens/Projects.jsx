// External Depedencies
import React from 'react';
import { Container, Toolbar, Box, Grid, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ArrowForward } from '@mui/icons-material';

// Style dependencies
import { appBarHeight } from 'app/styles';
import { EmptyContainer } from 'app/components/EmptyContainer';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({}));

/**
 * Dashboard Screen Component
 */
export const Projects = props => {
  const classes = useStyles();

  return <EmptyContainer image="img/under_construction.png" />;
};

export default Projects;
