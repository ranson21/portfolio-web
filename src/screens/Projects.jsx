// External Depedencies
import React from 'react';
import { Container, Toolbar, Box, Grid, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

// Style dependencies
import { line } from '@styles';
import { ChevronRight, OpenInNew } from '@mui/icons-material';

// Create the dashboard screen styles

const Article = styled(
  Grid,
  {}
)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    scale: '0.7',
    transformOrigin: 'top center',
    marginLeft: theme.spacing(1),
  },
}));

const Image = styled(
  'img',
  {}
)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    height: '300px',
  },
}));

/**
 * Dashboard Screen Component
 */
export const Projects = props => {
  // Create the styles for this screen
  const theme = useTheme();
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
      <Article item md={6}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', maxWidth: '500px' }}>
          <Grid item xs={12}>
            <Typography variant="h2" component="p">
              Projects
            </Typography>
            <div>
              <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
            </div>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: '500px', marginBottom: 5, marginTop: 2 }}>
            <Typography variant="h5" component="span">
              I spend a lot of my free time working on various projects to experiment with different technologies. While most of my projects
              are private, you can view my public repos or request a demo if there is something specific you would like to see.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: '500px', display: 'flex', flexWrap: 'nowrap' }}>
            <Button
              color="secondary"
              variant="outlined"
              size="large"
              href="#Contact"
              onClick={() => props.setSelectedPage('Contact')}
              sx={{ padding: '18px 25px', borderRadius: '100px', marginRight: 2 }}
              endIcon={<ChevronRight />}
            >
              Request Demo
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              target="_blank"
              href="https://github.com/ranson21?tab=repositories"
              sx={{ padding: '18px 25px', borderRadius: '100px' }}
              endIcon={<OpenInNew />}
            >
              View Projects
            </Button>
          </Grid>
        </Grid>
      </Article>
      <Grid item md={6} sx={{ marginTop: { xs: '-200px' } }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Image src={'img/girl_laptop_outdoors.png'} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Projects;
