// External Depedencies
import React from 'react';
import { Container, Toolbar, Box, Grid, Typography, Button, IconButton } from '@mui/material';
import { ChevronRight, Mail, GitHub, LinkedIn } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Style dependencies
import { line } from '@styles';
import { AstronautImage } from '@components/Astronaut';
import { RocketShip } from '@components/RocketShip';
import { Hero } from '@components/Hero';

// // Create the dashboard screen styles
// export const useStyles = makeStyles(theme => ({
//   root: {
//     height: `calc(100svh - ${appBarHeight}px)`,
//   },
//   intro: {
//     flex: 1,
//   },
//   image: {
//     maxWidth: '100%',
//   },
//   welcome: {
//     [theme.breakpoints.down('sm')]: {
//       fontSize: '3rem !important',
//     },
//   },
//   quote: {
//     backgroundColor: theme.palette.background.default,
//     opacity: 0.8,
//     borderLeft: `3px solid white`,
//     margin: '16px 0',
//     '& p': {
//       fontStyle: 'italic',
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));

/**
 * Dashboard Screen Component
 */
export const Home = props => {
  const theme = useTheme();

  // Define any inline styles
  const styles = {
    leftContainer: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      scale: { xs: '0.6', md: '1.0' },
      marginRight: { md: 0, xs: '100px' },
      marginTop: { md: 0, xs: '200px' },
    },
  };

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item sx={styles.leftContainer}>
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '5rem', textTransform: 'uppercase', lineHeight: '75px' }} component="h1">
              Abigail <br /> Ranson
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div>
              <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
              <span
                style={{
                  ...line(theme),
                  marginLeft: '3.2rem',
                }}
              ></span>
            </div>
          </Grid>
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <Typography
              variant="caption"
              component="p"
              textTransform="uppercase"
              fontSize="1.2rem"
              sx={{ marginBottom: 2.5, color: 'grey', maxWidth: { xs: '300px', lg: '500px' } }}
            >
              Platform Engineer & Fullstack Developer
            </Typography>
            <Typography sx={{ maxWidth: '400px', marginBottom: 1.5 }} fontSize="1.7rem">
              Hey there I'm Abigail, but you can call me Abby...
            </Typography>
            <Typography sx={{ maxWidth: '400px', marginBottom: 1.5 }} fontSize="1.7rem">
              Want help with a coding problem or starting on your next project?
            </Typography>
            <IconButton href="https://www.linkedin.com/in/abbyranson/" target="_blank">
              <LinkedIn color="secondary" />
            </IconButton>
            <IconButton href="https://github.com/RansonTesting" target="_blank">
              <GitHub />
            </IconButton>
            <IconButton href="mailto:abby@abbyranson.com" target="_blank">
              <Mail />
            </IconButton>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              onClick={() => document.getElementById('Contact').scrollIntoView()}
              sx={{ padding: '18px 25px', borderRadius: '100px', marginLeft: '25px', marginTop: { md: '-45px', xs: '-10px' } }}
              endIcon={<ChevronRight />}
            >
              Let's Chat
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <AstronautImage />
        <Hero />
        <RocketShip />
      </Grid>
    </Grid>
  );
};

export default Home;
