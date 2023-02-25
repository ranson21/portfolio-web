import { createSlice } from '@reduxjs/toolkit';
import { apolloClient } from 'app/config/apollo';

// Create the Initial State
const initialState = {
  isAuth: Boolean(sessionStorage.getItem('user')),
  role: '',
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {},
};

const updateMember = data => {
  // Parse the user item out of session storage
  const savedUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

  // Override the saved user data or set the saved user data
  const user = savedUser ? { ...savedUser, ...data } : data;

  // Update session storage
  sessionStorage.setItem('user', JSON.stringify(user));

  // Return the new user data
  return user;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      // Remove the auth state
      state.isAuth = false;

      // Clear the session storage
      sessionStorage.clear();

      // Reset the Apollo Store
      apolloClient.resetStore();
    },
    refreshMember: (state, action) => {
      state.user = updateMember(action.payload.user);
    },
    setAuth: (state, action) => {
      sessionStorage.setItem('refreshToken', action.payload.user.refreshToken);
      sessionStorage.setItem('token', action.payload.token);
      state.isAuth = true;

      state.user = updateMember({
        uid: action.payload.user.uid,
        app: action.payload.user.app,
        accountId: action.payload.user.accountId,
        role: action.payload.user.role,
        displayName: action.payload.user.displayName,
        email: action.payload.user.email,
        emailVerified: action.payload.user.emailVerified,
        disabled: action.payload.user.disabled,
        phoneNumber: action.payload.user.phoneNumber,
        lastSignInTime: action.payload.user.metadata.lastSignInTime,
        creationTime: action.payload.user.metadata.creationTime,
      });
    },
  },
});

export const { logout, setAuth, refreshMember } = authSlice.actions;

export default authSlice.reducer;
