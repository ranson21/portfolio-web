// External Dependencies
import React, { useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import {
  useScrollTrigger,
  Grid,
  AppBar as MAppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Send, Menu as MenuIcon, DownloadOutlined } from '@mui/icons-material';

// Component Dependencies
import { Logo } from '@components/Logo';
import { selectedItem } from '@styles';

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

const pages = ['Home', 'About', 'Projects', 'Contact'];

const StyledAppBar = styled(
  MAppBar,
  {}
)(({ theme }) => ({
  backgroundImage: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

/**
 * Method to render the Application Bar
 * @param {object} props -- Props Contain User Details for AppBar
 */
export const AppBar = props => {
  const theme = useTheme();

  const selectedStyles = selectedItem(theme);

  // Create the JSS Styles
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ElevationScroll {...props}>
      <StyledAppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', columnGap: '15px', alignItems: 'center' }}>
            <Logo />
            <Typography sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>abby@abbyranson.com</Typography>
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
                <Grid key={page} item sx={{ flexGrow: 0, display: { xs: 'none', lg: 'flex' } }}>
                  <Button
                    href={`#${page}`}
                    onClick={e => {
                      props.setNavClicked(true);

                      props.setSelected(page);
                    }}
                    sx={{ my: 2, color: 'white', display: 'block', ...(props.selected === page ? { ...selectedStyles } : {}) }}
                  >
                    {page}
                  </Button>
                </Grid>
              ))}
              <Grid item>
                <Button
                  download
                  href="docs/2024-04-01-resume.pdf"
                  size="small"
                  variant="contained"
                  color="secondary"
                  endIcon={<DownloadOutlined />}
                >
                  Resume
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
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
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link color="white" underline="none" href={`#${page}`}>
                    <Typography textAlign="center" sx={props.selected === page ? { ...selectedStyles } : {}}>
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </ElevationScroll>
  );
};
