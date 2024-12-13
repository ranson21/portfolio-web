/**
 * @module App
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';

// Set the DOM Element to attach the SPA
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
