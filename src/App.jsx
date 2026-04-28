import { useState, useMemo, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { InView } from 'react-intersection-observer';

import themeData from '@/styles/theme';
import { AppBar } from '@components/AppBar';
import { Copyright } from '@components/Copyright';
import GoogleCloudLogo from '@components/icons/GoogleCloudLogo';
import { ScreenContainer } from './containers/Screen';
import Home from './screens/Home';
import About from './screens/About';
import Projects from './screens/Projects';
import Contact from './screens/Contact';

function App() {
  const [selectedNav, setSelected] = useState('Home');
  const [navClicked, setNavClicked] = useState(false);

  // Define the screens for the App
  const screens = [
    {
        label: 'Home',
        Component: Home,
        props: {
          containerId: 'Home',
          containerStyles: {
            background:
              'radial-gradient(circle at 10% 10%, rgba(148, 163, 184, 0.1), transparent 28%), radial-gradient(circle at 90% 20%, rgba(71, 85, 105, 0.14), transparent 24%)',
          },
          wrapperStyles: { justifyContent: 'center' },
        },
      },
    {
      label: 'About',
      Component: About,
        props: {
          containerId: 'About',
          containerStyles: {
            position: 'relative',
            background:
              'linear-gradient(180deg, rgba(15, 20, 28, 0.42) 0%, rgba(7, 11, 17, 0) 100%)',
          },
        },
      },
    {
      label: 'Projects',
      Component: Projects,
        props: {
          containerId: 'Projects',
          containerStyles: {
            position: 'relative',
            background:
              'linear-gradient(180deg, rgba(15, 20, 28, 0.72) 0%, rgba(11, 15, 22, 0.92) 100%)',
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), inset 0 -1px 0 rgba(255,255,255,0.02)',
          },
        },
      },
    {
      label: 'Contact',
      Component: Contact,
        props: {
          containerId: 'Contact',
          containerStyles: {
            background:
              'linear-gradient(180deg, rgba(8, 11, 17, 1) 0%, rgba(6, 9, 14, 1) 100%)',
          },
        },
      },
    ];

  const theme = useMemo(() => createTheme(themeData), []);

  const handleInView = page => isSelected => {
    if (isSelected && !navClicked) {
      setSelected(page);
    }
  };

  useEffect(() => {
    const onWheel = () => setNavClicked(false);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ position: 'relative', overflowX: 'clip' }}>
        <AppBar selected={selectedNav} setSelected={setSelected} setNavClicked={setNavClicked} />

        {screens.map(({ Component, ...screen }) => (
          <InView key={screen.label} onChange={handleInView(screen.label)} threshold={0.55}>
            {({ ref }) => (
              <div ref={ref}>
                <ScreenContainer {...screen.props}>
                  <Component setSelectedPage={setSelected} setNavClicked={setNavClicked} />
                </ScreenContainer>
              </div>
            )}
          </InView>
        ))}

        <footer>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{
              px: { xs: 3, md: 8 },
              py: { xs: 2.5, md: 3 },
              backgroundColor: 'rgba(7, 11, 17, 0.72)',
              borderTop: '1px solid rgba(148, 163, 184, 0.08)',
            }}
          >
            <Grid item xs={12} md="auto">
              <Copyright />
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction="row" spacing={1.25} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Powered by
                </Typography>
                <Link
                  href="https://console.cloud.google.com"
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, opacity: 0.85, '&:hover': { opacity: 1 } }}
                >
                  <GoogleCloudLogo height={22} />
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </footer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
