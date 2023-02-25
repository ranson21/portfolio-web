// External Dependencies
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Container, Divider, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router';

import { parseURL } from 'app/utils/parser';
import { appBarHeight } from 'app/styles';
import { ProfileForm } from 'app/components/forms/Profile';
import { ResetPasswordForm } from 'app/components/forms/ResetPassword';
import { TwoFactorForm } from 'app/components/forms/TwoFactor';

// Create the styles for this component
const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
  },
  item: {},
  selectedItem: { borderRight: `4px solid ${theme.palette.primary.main}` },
  nav: { paddingTop: appBarHeight, borderRight: `1px solid ${lighten('#000', 0.8)}` },
  form: { flex: 1, padding: theme.spacing(3), fontWeight: 700 },
}));

const profileRoutes = [
  {
    name: 'profile',
    label: 'Profile',
    Form: ProfileForm,
  },
  {
    name: 'password',
    label: 'Password',
    Form: ResetPasswordForm,
  },
  {
    name: 'two-factor',
    label: 'Two-Factor Authentication',
    Form: TwoFactorForm,
  },
];

/**
 * Settings Screen Component
 */
export const Settings = props => {
  const [currentRoute] = parseURL();

  // Redirect if the current route doesnt contain the subpath
  if (currentRoute === 'settings') {
    return <Redirect to="/settings/profile" />;
  }

  // Create the JSS Styles
  const classes = useStyles();

  // Create the history object
  const history = useHistory();

  // Extract the current route details
  const [currentPath] = profileRoutes.filter(route => route.name === currentRoute);
  const { Form } = currentPath;

  return (
    <Container classes={{ root: classes.container }}>
      <Grid container classes={{ root: classes.container }}>
        <Grid item classes={{ root: classes.nav }}>
          <Typography variant="subtitle1">Account Settings</Typography>
          <Divider />
          <List>
            {profileRoutes.map(route => {
              const selected = currentRoute === route.name;

              return (
                <ListItem
                  button
                  key={route.name}
                  selected={selected}
                  onClick={() => history.push(`/settings/${route.name}`)}
                  classes={{
                    root: clsx(classes.item, {
                      [classes.selectedItem]: selected,
                    }),
                  }}
                >
                  {route.label}
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item classes={{ root: classes.form }}>
          <Typography variant="h4" component="p">
            {currentPath.label}
          </Typography>
          <Divider />
          <Form {...props} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
