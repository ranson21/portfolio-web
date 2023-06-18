// External Dependencies
import React from 'react';
import clsx from 'clsx';
import { Grid, AppBar as MAppBar, Toolbar, IconButton, Box, Menu, MenuItem, Typography, Button, Link } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// Component Dependencies
import Logo from 'app/components/Logo';
import { Send, Menu as MenuIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

// Create the styles for the AppBar component
export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  selected: {
    textDecoration: 'underline !important',
    textUnderlineOffset: '0.5rem !important',
    textDecorationColor: `${theme.palette.primary.main} !important`,
  },
}));

function ElevationScroll({ children }) {
  const theme = useTheme();

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? 'default' : 'transparent',
  });
}

const pages = ['Home', 'About', 'Projects'];

/**
 * Method to render the Application Bar
 * @param {object} props -- Props Contain User Details for AppBar
 */
export const AppBar = props => {
  // Create the JSS Styles
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { pathname } = useLocation();

  const route = label => {
    const path = label === 'Home' ? '/' : `/${label.toLocaleLowerCase()}`;

    return {
      selected: pathname === path || (label === 'Home' && pathname === '/'),
      path: `#${path}`,
    };
  };

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ElevationScroll {...props}>
      <MAppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link color="white" underline="none" href={route(page).path}>
                    <Typography
                      textAlign="center"
                      classes={{
                        root: clsx(
                          {},
                          {
                            [classes.selected]: route(page).selected,
                          }
                        ),
                      }}
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: { sm: 'center', xs: 'flex-start' },
              marginLeft: { sm: '0', xs: 12 },
              position: 'absolute',
              width: '100%',
              zIndex: -1,
            }}
          >
            <Typography sx={{ fontSize: { xs: 18, md: 28 } }} fontFamily="Satisfy, cursive">
              Abby Ranson
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2} alignItems="center">
              {pages.map(page => (
                <Grid key={page} item sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    href={route(page).path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    classes={{
                      root: clsx(
                        {},
                        {
                          [classes.selected]: route(page).selected,
                        }
                      ),
                    }}
                  >
                    {page}
                  </Button>
                </Grid>
              ))}
              <Grid item>
                <Button href="mailto:abby@abbyranson.com" size="small" variant="contained" color="primary" endIcon={<Send />}>
                  Contact
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </MAppBar>
    </ElevationScroll>
  );
};
