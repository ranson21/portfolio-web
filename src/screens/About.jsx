// External Depedencies
import React from 'react';
import { Chip, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

import { line } from '@styles';

const Container = styled(Grid, {})(() => ({
  flex: 1,
}));

const Article = styled(Grid, {})(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    transformOrigin: 'top center',
  },
}));

const ProfileImage = styled(
  'img',
  {}
)(({ theme }) => ({
  borderRadius: '24px',
  width: '100%',
  maxWidth: '420px',
  height: '560px',
  objectFit: 'cover',
  objectPosition: 'top',
  [theme.breakpoints.down('sm')]: {
    height: '360px',
  },
}));

/**
 * Dashboard Screen Component
 */
export const About = props => {
  // Create the styles for this screen
  const theme = useTheme();
  const capabilities = ['Architecture', 'Platform engineering', 'Cloud systems', 'Terraform', 'CI/CD', 'Developer experience'];

  return (
    <Container container justifyContent="center" alignItems="center" spacing={{ md: 4, xs: 2 }}>
      <Grid item md={6}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }} spacing={2}>
          <Grid item>
            <ProfileImage src="img/profile_pic.png" />
          </Grid>
          <Grid item md={12}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'rgba(15, 20, 28, 0.76)' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                    Collaboration
                  </Typography>
                  <Typography variant="h6">Remote-friendly</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                    Pronouns
                  </Typography>
                  <Typography variant="h6">She / Her</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Article item md={6}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', maxWidth: '560px' }}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              About Me
            </Typography>
            <div>
              <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.9 }}>
              I have been a software engineer since 2016, with earlier experience in systems administration that still shapes how I think
              about reliability, operations, and the realities of production systems.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.9 }}>
              My work sits at the intersection of architecture and delivery. I operate as a principal-level engineer who helps define
              technical direction, but I also stay hands-on in implementation, because architecture only matters when it holds up in real
              systems. I care about human-centered product thinking just as much as clean implementation. In 2019 I completed the{' '}
              <Link underline="none" color="secondary" href="https://www.nngroup.com/ux-certification/people/" target="_blank">
                Nielsen Norman Group UX Certification
              </Link>
              , which still informs how I approach system design, developer experience, and end-user workflows.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1.4} flexWrap="wrap" useFlexGap sx={{ pt: 0.5, pb: 1 }}>
              {capabilities.map(item => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    px: 0.6,
                    py: 2.4,
                    borderRadius: '999px',
                    backgroundColor: 'rgba(15, 20, 28, 0.76)',
                    border: '1px solid rgba(148, 163, 184, 0.12)',
                    '& .MuiChip-label': {
                      px: 1.2,
                    },
                  }}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'rgba(15, 20, 28, 0.76)' }}>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                If you want to work on a project together, improve an engineering workflow, or get help shaping a product idea,{' '}
                <Link underline="none" color="secondary" href="#Contact" onClick={() => props.setSelectedPage('Contact')}>
                  reach out here
                </Link>
                .
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Article>
    </Container>
  );
};

export default About;
