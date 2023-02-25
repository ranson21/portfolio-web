/**
 * @module App
 */
import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { LoadScreen } from 'app/screens/Loading';
import { ApolloProvider } from '@apollo/client/react';

// Import the Firebase app initializer
import { init } from 'app/config/firebase';
import { apolloClient } from 'app/config/apollo';

// Lazy load the application
const App = React.lazy(() => import('app/root'));
const Store = React.lazy(() => import('app/components/shared/StoreWrapper'));

// Set the DOM Element to attach the SPA
const root = document.getElementById('root');

// Initialize the firebase app
const firebase = init(process.env.API_KEY, process.env.SENDER_ID, process.env.APP_ID, process.env.PROJECT_ID);

const auth = firebase.auth();

/**
 * Main Application Render Method
 * @param {function} Component -- JSX Component being rendered
 * @memberof App
 */
export const renderer = (Component, dom) =>
  render(
    <Suspense fallback={<LoadScreen />}>
      <ApolloProvider client={apolloClient}>
        <Store>
          <Component auth={auth} />
        </Store>
      </ApolloProvider>
    </Suspense>,
    dom
  );

// Call the render method with the App component
renderer(App, root);

// Setup the hot module reloading to replace components on disk-write with the new version
if (module.hot) {
  module.hot.accept('app', () => renderer(App, dom));
}
