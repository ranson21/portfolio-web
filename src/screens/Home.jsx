// External Depedencies
import React from 'react';
import { Avatar, Box, Button, Chip, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { ChevronRight, Mail, GitHub, LinkedIn } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Style dependencies
import { line } from '@styles';

/**
 * Dashboard Screen Component
 */
export const Home = props => {
  const theme = useTheme();
  const specialties = ['Principal Engineering', 'Architecture', 'Platform Strategy', 'Hands-On Delivery'];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: '32px', md: '40px' },
        border: '1px solid rgba(148, 163, 184, 0.1)',
        background: 'linear-gradient(180deg, rgba(10, 13, 19, 0.82), rgba(7, 9, 14, 0.94))',
        boxShadow: '0 30px 80px rgba(2, 8, 23, 0.45)',
        px: { xs: 2.5, md: 4.5 },
        py: { xs: 3, md: 4.5 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 16% 18%, rgba(148, 163, 184, 0.1), transparent 20%), radial-gradient(circle at 82% 30%, rgba(71, 85, 105, 0.16), transparent 24%), linear-gradient(rgba(148, 163, 184, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.045) 1px, transparent 1px), linear-gradient(120deg, transparent 0 47.5%, rgba(148, 163, 184, 0.06) 48%, transparent 48.5%)',
          backgroundSize: 'auto, auto, 36px 36px, 36px 36px, 100% 100%',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.35))',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 18, md: 28 },
          left: { xs: 18, md: 28 },
          width: { xs: 120, md: 180 },
          height: { xs: 120, md: 180 },
          borderRadius: '50%',
          border: '1px solid rgba(148, 163, 184, 0.14)',
          boxShadow: '0 0 0 18px rgba(148, 163, 184, 0.035), 0 0 0 44px rgba(148, 163, 184, 0.02)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 30, md: 40 },
          left: { xs: 126, md: 190 },
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'secondary.main',
          boxShadow: '0 0 0 5px rgba(148, 163, 184, 0.08)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 'auto', md: '-10%' },
          right: { xs: '-28%', md: '-8%' },
          bottom: { xs: '-12%', md: 'auto' },
          width: { xs: 280, md: 420 },
          height: { xs: 280, md: 420 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(148, 163, 184, 0.18) 0%, rgba(148, 163, 184, 0.04) 34%, transparent 68%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 22, md: 42 },
          top: { xs: 24, md: 34 },
          width: { xs: 120, md: 180 },
          height: 1,
          background: 'linear-gradient(90deg, rgba(148, 163, 184, 0.24), transparent)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 22, md: 42 },
          top: { xs: 42, md: 52 },
          color: 'text.secondary',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          opacity: 0.72,
          pointerEvents: 'none',
        }}
      >
        Systems View
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 22, md: 42 },
          bottom: { xs: 158, md: 164 },
          width: { xs: 90, md: 140 },
          height: { xs: 56, md: 72 },
          borderLeft: '1px solid rgba(148, 163, 184, 0.14)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.14)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 26, md: 46 },
          bottom: { xs: 132, md: 134 },
          color: 'text.secondary',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          opacity: 0.68,
          pointerEvents: 'none',
        }}
      >
        Engineered for clarity
      </Box>
      <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Typography sx={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'secondary.main' }}>
              Abigail Ranson
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '3.4rem', md: '5.4rem' },
                lineHeight: { xs: 1, md: 0.94 },
                maxWidth: '10ch',
              }}
            >
              Principal engineering with architecture depth.
            </Typography>
            <div>
              <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
              <span style={{ ...line(theme), marginLeft: '3.2rem' }}></span>
            </div>
            <Typography sx={{ maxWidth: 620, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.75 }}>
              I have worked as a software engineer since 2016, following earlier systems administration experience. Today I help teams
              shape architecture, modernize platforms, and still stay close to the code where execution quality matters.
            </Typography>
            <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
              {specialties.map(item => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    borderRadius: '999px',
                    backgroundColor: 'rgba(15, 20, 28, 0.84)',
                    border: '1px solid rgba(148, 163, 184, 0.14)',
                    color: 'text.primary',
                  }}
                />
              ))}
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={() => document.getElementById('Contact').scrollIntoView()}
                endIcon={<ChevronRight />}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                Start a conversation
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                size="large"
                href="#Projects"
                onClick={() => props.setSelectedPage('Projects')}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                View selected work
              </Button>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton href="https://www.linkedin.com/in/abbyranson/" target="_blank" sx={{ border: '1px solid rgba(148, 163, 184, 0.14)' }}>
                <LinkedIn color="secondary" />
              </IconButton>
              <IconButton href="https://github.com/RansonTesting" target="_blank" sx={{ border: '1px solid rgba(148, 163, 184, 0.14)' }}>
                <GitHub />
              </IconButton>
              <IconButton href="mailto:abby@abbyranson.com" target="_blank" sx={{ border: '1px solid rgba(148, 163, 184, 0.14)' }}>
                <Mail />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: '28px',
              background: 'linear-gradient(180deg, rgba(15, 20, 28, 0.94), rgba(9, 12, 18, 0.84))',
              boxShadow: '0 32px 80px rgba(2, 8, 23, 0.42)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(148, 163, 184, 0.06), transparent 36%), radial-gradient(circle at top right, rgba(148, 163, 184, 0.12), transparent 28%)',
                pointerEvents: 'none',
              }}
            />
              <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src="img/profile_pic.png" alt="Abigail Ranson" sx={{ width: 72, height: 72 }} />
                <Box>
                  <Typography variant="h6">Abby Ranson</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Principal engineer and architect</Typography>
                </Box>
              </Stack>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                Focused on platform reliability, cloud architecture, developer experience, delivery systems, and application design for teams
                that need scalable systems without losing operational clarity.
              </Typography>
              <Grid container spacing={2}>
                {[
                  ['Principal-level', 'technical leadership with hands-on execution'],
                  ['Platform + product', 'architecture spanning systems and application delivery'],
                  ['Production-minded', 'operability, reliability, and developer experience'],
                ].map(([title, subtitle]) => (
                  <Grid item xs={12} sm={4} md={12} key={title}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.2,
                        borderRadius: '20px',
                        backgroundColor: 'rgba(9, 12, 18, 0.82)',
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>{title}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{subtitle}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 16, md: 28 },
          right: { xs: 16, md: 28 },
          bottom: { xs: 16, md: 22 },
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.25), transparent)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default Home;
