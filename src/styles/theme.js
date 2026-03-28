const theme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#e6ebf2',
      contrastText: '#091018',
    },
    secondary: {
      main: '#94a3b8',
      light: '#cbd5e1',
      dark: '#64748b',
      contrastText: '#081018',
    },
    background: {
      default: '#05070b',
      paper: '#0f141c',
    },
    text: {
      primary: '#edf1f7',
      secondary: '#9aa4b2',
    },
    divider: 'rgba(148, 163, 184, 0.14)',
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"IBM Plex Sans", "Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.05em',
    },
    h2: {
      fontFamily: '"IBM Plex Sans", "Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h3: {
      fontFamily: '"IBM Plex Sans", "Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          background:
            'radial-gradient(circle at top, rgba(148,163,184,0.1), transparent 30%), linear-gradient(180deg, #090c12 0%, #06080d 45%, #04060a 100%)',
          scrollbarColor: '#475569 #0b1017',
        },
        '#root': {
          minHeight: '100vh',
        },
        a: {
          color: 'inherit',
        },
        '*': {
          scrollbarWidth: 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '12px',
          height: '12px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#0b1017',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#475569',
          borderRadius: '999px',
          border: '3px solid #0b1017',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#64748b',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(5, 7, 11, 0.78)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          minHeight: 46,
          paddingInline: 22,
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: '0.95rem',
          lineHeight: 1.1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiButton-startIcon svg, & .MuiButton-endIcon svg': {
            fontSize: '1.1rem',
          },
        },
        sizeLarge: {
          minHeight: 54,
          display: 'flex',
          alignItems: 'center',
          paddingInline: 26,
          paddingTop: 14,
          paddingBottom: 14,
          fontSize: '0.98rem',
        },
        sizeSmall: {
          minHeight: 40,
          display: 'flex',
          alignItems: 'center',
          paddingInline: 18,
          paddingTop: 9,
          paddingBottom: 9,
        },
        contained: {
          boxShadow: '0 14px 34px rgba(15, 23, 42, 0.34)',
        },
        outlined: {
          borderColor: 'rgba(148, 163, 184, 0.28)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(148, 163, 184, 0.12)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 20, 28, 0.72)',
          borderRadius: 16,
        },
      },
    },
  },
};

export default theme;
