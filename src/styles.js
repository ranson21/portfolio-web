/**
 * Global Styles
 */
export const appBarHeight = 64;
export const spacer = { flex: 1 };

export const container = {
  height: '100%',
  width: '100%',
};

export const selectedItem = theme => ({
  textDecoration: 'underline !important',
  textUnderlineOffset: '0.5rem !important',
  textDecorationColor: `${theme.palette.secondary.light} !important`,
});

export const line = theme => ({
  display: 'block',
  width: '91px',
  marginBottom: '1.2rem',
  height: '4px',
  borderRadius: '5px',
  background: theme.palette.secondary.main,
});

/* CSS HEX */
// --oxford-blue: #0f0c29ff;
// --battleship-gray: #8f857dff;
// --true-blue: #3066beff;
// --non-photo-blue: #92dce5ff;
// --icterine: #fcfc62ff;
