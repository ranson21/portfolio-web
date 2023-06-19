/**
 * @module App
 */
import React from 'react';
import { render } from 'react-dom';

import App from 'app/router';
import { ThemeWrapper } from 'app/components/ThemeWrapper';

// Set the DOM Element to attach the SPA
const root = document.getElementById('root');

/**
 * Main Application Render Method
 * @param {function} Component -- JSX Component being rendered
 * @memberof App
 */
export const renderer = (Component, dom) =>
  render(
    <ThemeWrapper>
      <Component />
    </ThemeWrapper>,
    dom
  );

// Call the render method with the App component
renderer(App, root);
