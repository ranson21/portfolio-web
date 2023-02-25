// External Dependencies
import React from 'react';
import { Route } from 'react-router-dom';

// Component Dependencies
import { PrivateLayout } from 'app/layouts/Private';

/**
 * Organization Route component renders an organizationl route in the Private Layout
 * @param {Object} props -- Contains the Screen to render wrapped in the Private Layout
 */
export const OrgRoute = ({ component: Screen, ...props }) => {
  // Create the Navigation Closure
  const nav = () => (props.isAuth ? <PrivateLayout Screen={Screen} {...props} /> : <Redirect to={'/login'} />);

  // Return the Modified route
  return <Route render={nav} {...props} />;
};
