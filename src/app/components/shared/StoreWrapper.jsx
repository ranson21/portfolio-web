// External Dependencies
import React from 'react';
import { Provider } from 'react-redux';

// Import local dependencies
import { ThemeWrapper } from 'app/components/shared/ThemeWrapper';
import { configureStore } from 'app/store/config';

// Create the Redux Store
const store = configureStore();

/**
 * Method to wrap the application with a theme
 * @param {Object} props -- Contains the component children and user settings
 */
export default ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
};
