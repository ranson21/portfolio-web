// External Depedencies
import React from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGolang, faReact } from '@fortawesome/free-brands-svg-icons';
import { styled } from '@mui/material/styles';

import { line } from '@styles';

const Container = styled(
  Grid,
  {}
)(({ theme }) => ({
  flex: 1,
}));

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

const ProfileImage = styled(
  'img',
  {}
)(({ theme }) => ({
  borderRadius: '10px',
  width: '350px',
  height: '570px',
  objectFit: 'cover',
  objectPosition: 'top',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
    width: 'auto',
  },
}));

/**
 * Dashboard Screen Component
 */
export const About = props => {
  // Create the styles for this screen
  const theme = useTheme();

  return (
    <Container container justifyContent="center" alignItems="center" spacing={{ md: 4, xs: 2 }}>
      <Grid item md={6}>
        <Grid container justifyContent="flex-end" alignItems="center" sx={{ height: '100%' }} spacing={2}>
          <Grid item>
            <ProfileImage src="img/profile_pic.png" />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h5" component="p" fontWeight={700} textAlign="end">
              Location
            </Typography>
            <Typography variant="h6" component="p" textAlign="end">
              Sacramento, CA
            </Typography>
            <Typography variant="h5" component="p" fontWeight={700} textAlign="end">
              Pronouns
            </Typography>
            <Typography variant="h6" component="p" textAlign="end">
              She / Her
            </Typography>
            {/* <blockquote>
              <Typography variant="h5" component="p">
                "Alone, we can do so little; Together we can do so much."
              </Typography>
              <p />
              <footer>
                <Typography variant="h6" component="p">
                  - Hellen Keller
                </Typography>
              </footer>
            </blockquote> */}
          </Grid>
        </Grid>
      </Grid>
      <Article item md={6}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', maxWidth: '500px' }}>
          <Grid item xs={12}>
            <Typography variant="h2" component="p">
              About Me
            </Typography>
            <div>
              <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
            </div>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: '500px' }}>
            <Typography variant="h5" component="span">
              I am a fullstack engineer based in{' '}
            </Typography>
            <Link
              underline="none"
              color="secondary"
              sx={{ fontSize: '1.6rem' }}
              href="https://www.google.com/maps/place/Sacramento,+CA"
              target="_blank"
            >
              Sacramento, CA
            </Link>
            <Typography variant="h5" component="span">
              . I work with a lot of different programming languages and frameworks, but I primarily specialize in{' '}
            </Typography>
            <Link underline="none" color="secondary" sx={{ fontSize: '1.4rem' }} href="https://react.dev/" target="_blank">
              <FontAwesomeIcon icon={faReact} style={{ color: `${theme.palette.secondary.main} !important` }} /> React
            </Link>
            <Typography variant="h5" component="span">
              {' '}
              and{' '}
            </Typography>
            <Link underline="none" color="secondary" sx={{ fontSize: '1.4rem' }} href="https://go.dev/" target="_blank">
              <FontAwesomeIcon icon={faGolang} /> Golang
            </Link>
            <Typography variant="h5" component="span">
              .
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: '500px', marginTop: 5 }}>
            <Typography variant="h5" component="span">
              I believe that every successful project starts with Human Centered Design (HCD). Being able to understand and empathize with
              the folks that will be using the tools and products you create is crucial. In 2019 I achieved my{' '}
            </Typography>
            <Link
              underline="none"
              color="secondary"
              sx={{ fontSize: '1.4rem' }}
              href="https://www.nngroup.com/ux-certification/people/"
              target="_blank"
            >
              Nielson Norman Group UI/UX Certificate
            </Link>
            <Typography variant="h5" component="span">
              {' '}
              to better guide me in my development efforts. If you want to work on a project together or have any questions{' '}
            </Typography>
            <Link
              underline="none"
              color="secondary"
              sx={{ fontSize: '1.4rem' }}
              href="#Contact"
              onClick={() => props.setSelectedPage('Contact')}
            >
              just ask!
            </Link>
          </Grid>
        </Grid>
      </Article>
    </Container>
  );
};

export default About;
