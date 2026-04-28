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
  color: `${theme.palette.text.primary} !important`,
  backgroundColor: 'rgba(148, 163, 184, 0.1)',
  border: '1px solid rgba(148, 163, 184, 0.16)',
});

export const line = theme => ({
  display: 'block',
  width: '88px',
  marginBottom: '1.2rem',
  height: '3px',
  borderRadius: '999px',
  background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, rgba(148, 163, 184, 0.08) 100%)`,
});
