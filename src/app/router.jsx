// External Dependencies
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';

// Component Dependencies
import { LoadScreen } from 'app/screens/Loading';

// Top-Level routes
export const ROUTES = [
  {
    path: 'home',
    Icon: Dashboard,
  },
];

const AppContainer = React.lazy(() => import('app/components/AppContainer'));

// Application Screens
const Home = React.lazy(() => import('app/screens/Home'));
const About = React.lazy(() => import('app/screens/About'));
const Projects = React.lazy(() => import('app/screens/Projects'));

/**
 * Application Router
 * @param {object} props -- Route Properties
 */
export const AppRouter = props => {
  return (
    <Suspense fallback={<div />}>
      <Router>
        <Routes>
          <Route element={<AppContainer {...props} Screen={Home} />} exact path="/" />
          <Route element={<AppContainer {...props} Screen={About} />} exact path="/about" />
          <Route element={<AppContainer {...props} Screen={Projects} />} exact path="/projects" />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
