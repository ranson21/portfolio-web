// External Dependencies
import React from 'react';
import { styled } from '@mui/material/styles';
import { useScrollTrigger, Grid, AppBar as MAppBar, Toolbar, IconButton, Box, Menu, MenuItem, Typography, Button, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, DownloadOutlined } from '@mui/icons-material';

// Component Dependencies
import { Logo } from '@components/Logo';
import { selectedItem } from '@styles';

function ElevationScroll({ children }) {
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
  zIndex: theme.zIndex.drawer - 1,
}));

/**
 * Method to render the Application Bar
 * @param {object} props -- Props Contain User Details for AppBar
 */
export const AppBar = props => {
  const selectedStyles = selectedItem(useTheme());

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
        <Toolbar sx={{ minHeight: 80, gap: 2 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', columnGap: '15px', alignItems: 'center' }}>
            <Logo />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Abigail Ranson</Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Principal engineer, architect, and hands-on technical leader</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', xl: 'block' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: -1,
            }}
          >
            <Typography sx={{ fontSize: 13, letterSpacing: '0.22em', color: 'text.secondary', textTransform: 'uppercase' }}>
              Remote collaboration
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2} alignItems="center">
              {pages.map(page => (
                <Grid key={page} item sx={{ flexGrow: 0, display: { xs: 'none', lg: 'flex' } }}>
                  <Button
                    href={`#${page}`}
                    onClick={() => {
                      props.setNavClicked(true);

                      props.setSelected(page);
                    }}
                    sx={{
                      my: 2,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.secondary',
                      borderRadius: '999px',
                      ...(props.selected === page ? { ...selectedStyles } : {}),
                    }}
                  >
                    {page}
                  </Button>
                </Grid>
              ))}
              <Grid item>
                <Button
                  download
                  href="docs/2026-03-28-resume.pdf"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  endIcon={<DownloadOutlined />}
                  sx={{ display: 'flex', alignItems: 'center' }}
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
                  <Link color="text.primary" underline="none" href={`#${page}`}>
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
