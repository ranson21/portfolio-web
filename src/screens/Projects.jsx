// External Depedencies
import React from 'react';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

// Style dependencies
import { line } from '@styles';
import { ChevronRight, OpenInNew } from '@mui/icons-material';
import { projectContent } from '@/content/portfolioContent';

// Create the dashboard screen styles

const Article = styled(Grid, {})(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    transformOrigin: 'top center',
  },
}));

/**
 * Dashboard Screen Component
 */
export const Projects = props => {
  // Create the styles for this screen
  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        flex: 1,
        position: 'relative',
        py: { xs: 2, md: 3 },
      }}
      spacing={4}
    >
      <Article item xs={12} md={4}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', maxWidth: '500px' }}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              Projects
            </Typography>
            <div>
              <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
            </div>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: '500px', marginBottom: 5, marginTop: 2 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.9 }}>
              {projectContent.intro}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: '500px', mb: 4 }}>
            <Stack spacing={1.25}>
              {projectContent.supportingPoints.map(point => (
                <Typography key={point} sx={{ color: 'text.primary', fontSize: '0.98rem' }}>
                  {`• ${point}`}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: '500px', display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button
              color="secondary"
              variant="outlined"
              size="large"
              href="#Contact"
              onClick={() => props.setSelectedPage('Contact')}
              endIcon={<ChevronRight />}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Request Demo
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              target="_blank"
              href="https://github.com/ranson21?tab=repositories"
              endIcon={<OpenInNew />}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              View Projects
            </Button>
          </Grid>
        </Grid>
      </Article>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2.5}>
          {projectContent.cards.map(project => (
            <Grid item xs={12} key={project.title}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: '24px',
                  background: 'linear-gradient(180deg, rgba(15, 20, 28, 0.86), rgba(8, 11, 17, 0.94))',
                  boxShadow: '0 22px 48px rgba(2, 8, 23, 0.26)',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack spacing={2.2}>
                    <Typography sx={{ color: 'secondary.main', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      {project.eyebrow}
                    </Typography>
                    <Typography variant="h4">{project.title}</Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{project.summary}</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {project.highlights.map(highlight => (
                        <Typography
                          key={highlight}
                          sx={{
                            px: 1.4,
                            py: 0.8,
                            borderRadius: '999px',
                            fontSize: 13,
                            color: 'text.primary',
                            backgroundColor: 'rgba(15, 20, 28, 0.78)',
                            border: '1px solid rgba(148, 163, 184, 0.12)',
                          }}
                        >
                          {highlight}
                        </Typography>
                      ))}
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button
                        variant={project.href.startsWith('http') ? 'contained' : 'outlined'}
                        color="secondary"
                        href={project.href}
                        target={project.href.startsWith('http') ? '_blank' : undefined}
                        sx={{ display: 'flex', alignItems: 'center' }}
                        endIcon={project.href.startsWith('http') ? <OpenInNew /> : <ChevronRight />}
                        onClick={() => {
                          if (project.href === '#Contact') {
                            props.setSelectedPage('Contact');
                          }
                        }}
                      >
                        {project.cta}
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Projects;
