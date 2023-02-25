// External Dependencies
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import auth from 'app/store/reducers/auth';
import theme from 'app/store/reducers/theme';

// Combine the Reducers to create the Store
export const rootEpic = combineEpics();

// Combine the Reducers to create the Store
export const rootReducer = combineReducers({
  form: formReducer,
  theme,
  auth,
});
