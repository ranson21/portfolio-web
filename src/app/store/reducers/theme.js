import { createSlice } from '@reduxjs/toolkit'
import { theme } from 'app/config/theme'

// Create the Initial State
const initialState = {
  selected: {}
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.selected = theme(action.payload)
    }
  }
})

export const {
  toggleTheme,
} = themeSlice.actions;

export default themeSlice.reducer;