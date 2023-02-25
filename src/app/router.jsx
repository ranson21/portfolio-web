// External Dependencies
import React, { Suspense } from 'react';
import { HashRouter as Router, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Component Dependencies
import { PublicRoute } from 'app/components/route/Public';
import { PrivateRoute } from 'app/components/route/Private';
import { LoadScreen } from 'app/screens/Loading';

// Store Dependencies
import { authState } from 'app/store/selectors/auth';

// Application Screens
const Login = React.lazy(() => import('app/screens/Login'));
const ResetPassword = React.lazy(() => import('app/screens/ResetPassword'));
const Dashboard = React.lazy(() => import('app/screens/Dashboard'));
const Accounts = React.lazy(() => import('app/screens/Accounts'));
const Members = React.lazy(() => import('app/screens/Members'));
const Standards = React.lazy(() => import('app/screens/Standards'));
const StandardDetails = React.lazy(() => import('app/screens/StandardDetails'));
const AccountProfile = React.lazy(() => import('app/screens/AccountProfile'));
const MemberProfile = React.lazy(() => import('app/screens/MemberProfile'));
const Settings = React.lazy(() => import('app/screens/Settings'));
const NotFound = React.lazy(() => import('app/screens/NotFound'));

/**
 * Application Router
 * @param {object} props -- Route Properties
 */
export const AppRouter = props => {
  const state = useSelector(authState);

  return (
    <Suspense fallback={<LoadScreen />}>
      <Router>
        <Switch>
          <PublicRoute {...props} {...state} exact path="/login" component={Login} auth={props.auth} />
          <PublicRoute {...props} {...state} exact path="/resetPassword" component={ResetPassword} auth={props.auth} />
          <PrivateRoute exact path="/home" component={Dashboard} {...props} {...state} />
          <PrivateRoute exact path="/members" component={Members} {...props} {...state} />
          <PrivateRoute exact path="/members/:name" component={MemberProfile} {...props} {...state} />
          <PrivateRoute exact path="/standards" component={Standards} {...props} {...state} />
          <PrivateRoute exact path="/standards/:name" component={StandardDetails} {...props} {...state} />
          <PrivateRoute exact path="/accounts" component={Accounts} {...props} {...state} />
          <PrivateRoute exact path="/accounts/:name" component={AccountProfile} {...props} {...state} />
          <PrivateRoute exact path="/settings" component={Settings} {...props} {...state} />
          <PrivateRoute exact path="/settings/profile" component={Settings} {...props} {...state} />
          <PrivateRoute exact path="/settings/password" component={Settings} {...props} {...state} />
          <PrivateRoute exact path="/settings/two-factor" component={Settings} {...props} {...state} />
          <PrivateRoute exact component={NotFound} {...props} {...state} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
