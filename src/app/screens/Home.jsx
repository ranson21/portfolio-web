// External Depedencies
import React from 'react';
import { Container, Toolbar, Box, Grid, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ArrowForward } from '@mui/icons-material';

// Style dependencies
import { appBarHeight } from 'app/styles';
import { Copyright } from 'app/components/Copyright';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100svh - ${appBarHeight}px)`,
  },
  intro: {
    flex: 1,
  },
  image: {
    maxWidth: '100%',
  },
  welcome: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem !important',
    },
  },
  quote: {
    backgroundColor: theme.palette.background.default,
    opacity: 0.8,
    borderLeft: `3px solid white`,
    margin: '16px 0',
    '& p': {
      fontStyle: 'italic',
      marginLeft: theme.spacing(2),
    },
  },
}));

/**
 * Dashboard Screen Component
 */
export const Home = props => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" classes={{ root: classes.root }}>
        <Grid item classes={{ root: classes.intro }}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" align="center" classes={{ root: classes.welcome }}>
                  Technology Belongs to All
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Software Engineer dedicated to making technology available regardless of economic background.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <blockquote className={classes.quote}>
                  <Typography variant="h5" component="p">
                    "Alone, we can do so little; Together we can do so much."
                  </Typography>
                  <p />
                  <footer>
                    <Typography variant="h6" component="p">
                      - Hellen Keller
                    </Typography>
                  </footer>
                </blockquote>
              </Grid>
              <Grid item xs={12}>
                <Button endIcon={<ArrowForward />} variant="outlined">
                  Get to Know Me
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <img src={'img/girl_laptop_outdoors.png'} className={classes.image} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" classes={{ root: classes.hero }}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Container>
  );
};

export default Home;
