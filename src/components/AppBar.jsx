// External Dependencies
import React from 'react';
import { styled } from '@mui/material/styles';
import { useScrollTrigger, Grid, AppBar as MAppBar, Toolbar, IconButton, Box, Menu, MenuItem, Typography, Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuList, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, OpenInNew, ArrowDropDown, DownloadOutlined } from '@mui/icons-material';

// Component Dependencies
import { Logo } from '@components/Logo';
import { selectedItem } from '@styles';

// The most recent dated resume PDFs — update these when new PDFs are generated
const RESUME_PDF_URL = 'docs/2026-04-28-resume.pdf';
const RESUME_HTML_URL = 'docs/resume.html';

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

  // Mobile nav menu state
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Resume split-button dropdown state
  const [resumeMenuOpen, setResumeMenuOpen] = React.useState(false);
  const resumeAnchorRef = React.useRef(null);

  const handleResumeMenuToggle = () => {
    setResumeMenuOpen(prev => !prev);
  };

  const handleResumeMenuClose = event => {
    if (resumeAnchorRef.current && resumeAnchorRef.current.contains(event.target)) {
      return;
    }
    setResumeMenuOpen(false);
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
                {/* Split button: primary = View Resume, dropdown = Download PDF */}
                <ButtonGroup
                  ref={resumeAnchorRef}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  aria-label="resume actions"
                >
                  <Button
                    href={RESUME_HTML_URL}
                    target="_blank"
                    rel="noopener"
                    endIcon={<OpenInNew sx={{ fontSize: '14px !important' }} />}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    Resume
                  </Button>
                  <Button
                    size="small"
                    aria-label="download resume options"
                    aria-haspopup="menu"
                    aria-expanded={resumeMenuOpen}
                    onClick={handleResumeMenuToggle}
                    sx={{ px: 0.5 }}
                  >
                    <ArrowDropDown />
                  </Button>
                </ButtonGroup>
                <Popper
                  sx={{ zIndex: 1300 }}
                  open={resumeMenuOpen}
                  anchorEl={resumeAnchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  placement="bottom-end"
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom' }}
                    >
                      <Paper elevation={4}>
                        <ClickAwayListener onClickAway={handleResumeMenuClose}>
                          <MenuList autoFocusItem dense>
                            <MenuItem
                              component="a"
                              href={RESUME_PDF_URL}
                              download
                              onClick={() => setResumeMenuOpen(false)}
                            >
                              <DownloadOutlined sx={{ mr: 1, fontSize: 18 }} />
                              Download PDF
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
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
