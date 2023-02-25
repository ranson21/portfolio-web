// External Dependencies
import React from 'react';
import clsx from 'clsx';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

// Component Dependencies
import { NavList, ListItemLink } from 'app/components/route/List';

// Style Dependencies
import { leftDrawerWidth, appBarHeight } from 'app/styles';

// Constants
import { ROUTES } from 'app/routes';

// Create the navigation panel styles
export const useStyles = makeStyles(theme => ({
  drawer: {
    zIndex: 0,
    width: leftDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: leftDrawerWidth,
  },
}));

/**
 * Side Navigation panel
 * @param {Object} props -- Contains the children and pases through props
 */
export const NavPanel = ({ children, open, setOpen, ...props }) => {
  // Create the JSS Styles
  const classes = useStyles();

  const { pathname } = useLocation();

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
    >
      <NavList>
        {ROUTES.map(({ Icon, ...route }) => {
          const path = `/${route.path}`;

          return (
            <ListItemLink
              key={route.path}
              selected={pathname === path}
              href={`#${path}`}
              classes={{ root: classes.iconLink }}
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }} primary={`${capitalize(route.path)}`} />
            </ListItemLink>
          );
        })}
      </NavList>
    </Drawer>
  );
};
