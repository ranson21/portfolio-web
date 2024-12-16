import { useState, useMemo, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Button, Grid, Typography, IconButton, Link } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ChevronRight, GitHub, LinkedIn, Mail } from '@mui/icons-material';
import { InView } from 'react-intersection-observer';

import themeData from '@/styles/theme';
import { AppBar } from '@components/AppBar';
import { Copyright } from '@components/Copyright';
import { ScreenContainer } from './containers/Screen';
import Home from './screens/Home';
import About from './screens/About';
import Projects from './screens/Projects';
import Contact from './screens/Contact';

function App(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [selectedNav, setSelected] = useState('Home');
  const [navClicked, setNavClicked] = useState(false);

  // Define the screens for the App
  const screens = [
    {
      label: 'Home',
      Component: Home,
      props: {
        containerId: 'Home',
        containerStyles: { backgroundImage: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)' },
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
          zIndex: 1000,
          backgroundImage: 'url("img/wave.svg")',
          backgroundSize: 'cover',
        },
      },
    },
    {
      label: 'Projects',
      Component: Projects,
      props: {
        containerId: 'Projects',
        containerStyles: { backgroundImage: 'url("img/shiny_overlay.svg")', backgroundSize: 'cover' },
      },
    },
    {
      label: 'Contact',
      Component: Contact,
      props: {
        containerId: 'Contact',
        containerStyles: { backgroundImage: 'url("img/simple_shiny.svg")', backgroundSize: 'cover' },
      },
    },
  ];

  const theme = useMemo(
    () =>
      createTheme({
        ...themeData,
        palette: {
          ...themeData.palette,
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  const handleInView = page => isSelected => {
    if (isSelected && !navClicked) {
      setSelected(page);
    }
  };

  useEffect(() => {
    window.addEventListener('mousewheel', () => {
      setNavClicked(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar selected={selectedNav} setSelected={setSelected} setNavClicked={setNavClicked} />

      {screens.map(({ Component, ...screen }) => (
        <InView key={screen.label} onChange={handleInView(screen.label)} threshold={0.8}>
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
        <Grid container justifyContent="center" spacing={1} sx={{ background: '#0F0C2A' }}>
          <Grid item xs={12}>
            <Copyright />
          </Grid>
          <Grid item sx={{ marginBottom: 3, display: 'flex' }}>
            <span> Powered By</span>
            <Link href="https://console.cloud.google.com" underline="none" target="_blank">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"
                height="25px"
                style={{ marginLeft: '10px' }}
              />
            </Link>
          </Grid>
        </Grid>
      </footer>
    </ThemeProvider>
  );
}

export default App;
