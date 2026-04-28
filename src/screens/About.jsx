// External Depedencies
import React from 'react';
import { Chip, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

import { line } from '@styles';
import { aboutContent } from '@/content/portfolioContent';

const Container = styled(
  Grid,
  {},
)(() => ({
  flex: 1,
}));

const Article = styled(
  Grid,
  {},
)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    transformOrigin: 'top center',
  },
}));

const ProfileImage = styled(
  'img',
  {},
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
                  <Typography variant="h6">{aboutContent.collaborationLabel}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                    Pronouns
                  </Typography>
                  <Typography variant="h6">{aboutContent.pronouns}</Typography>
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
            <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.9 }}>{aboutContent.intro}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.9 }}>
              {aboutContent.philosophy} In 2019 I completed the{' '}
              <Link underline="none" color="secondary" href={aboutContent.credentialHref} target="_blank">
                {aboutContent.credentialLabel}
              </Link>
              {aboutContent.credentialFooter}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1.4} flexWrap="wrap" useFlexGap sx={{ pt: 0.5, pb: 1 }}>
              {aboutContent.capabilities.map(item => (
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
              <Stack spacing={1.2}>
                {aboutContent.hiringSignals.map(signal => (
                  <Typography key={signal} sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {`• ${signal}`}
                  </Typography>
                ))}
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, pt: 0.5 }}>
                  If you want to work on a project together, improve an engineering workflow, or bring in senior technical leadership,{' '}
                  <Link underline="none" color="secondary" href="#Contact" onClick={() => props.setSelectedPage('Contact')}>
                    reach out here
                  </Link>
                  .
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Article>
    </Container>
  );
};

export default About;
