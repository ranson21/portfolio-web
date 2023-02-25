// External Dependencies
import { configureStore as createStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Local Configurations
import { rootEpic, rootReducer } from 'app/store/root';
import { loggerMiddleware } from 'app/store/middleware';
import { enableMapSet } from 'immer';

/**
 * Configures the redux store
 * @param {Object} preloadedState -- The initial state to load the store
 */
export const configureStore = preloadedState => {
  // Enable the Map and Set data structures in the redux store
  enableMapSet();

  // Create the Epic Middleware
  const epicMiddleware = createEpicMiddleware();

  // Create the store
  const store = createStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, epicMiddleware, loggerMiddleware],
    preloadedState,
  });

  // Set the Root epic for HMR
  const epic$ = new BehaviorSubject(rootEpic);

  const hotReloadingEpic = (...args) => epic$.pipe(switchMap(epic => epic(...args)));

  epicMiddleware.run(hotReloadingEpic);

  if (module.hot) {
    module.hot.accept('app/store/root', () => {
      // Get the Next Root Epic
      const nextRootEpic = require('app/store/root').rootEpic;
      const nextRootReducer = require('app/store/root').rootReducer;

      // Now setup the new one
      epic$.next(nextRootEpic);
      store.replaceReducer(nextRootReducer);
    });
  }

  // Return the Created Store
  return store;
};
