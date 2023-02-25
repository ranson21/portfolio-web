export const authState = state => ({
  role: state.auth.role,
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  organization: state.auth.organization,
});
