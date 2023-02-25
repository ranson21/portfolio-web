// External Depedencies
import React from 'react';
import { ListItem, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { appBarHeight } from 'app/styles';

// Create the navigation list styles
export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    marginTop: appBarHeight,
    color: theme.palette.textColor,
    backgroundColor: theme.palette.background.light,
  },
  listRoot: { padding: '0 !important' },
}));

/**
 * Navigation List Item component
 * @param {Object} props -- Passes props through
 */
export const ListItemLink = props => <ListItem button component="a" {...props} />;

/**
 * Navigation List component
 * @param {Object} props -- Contains children to render
 */
export const NavList = ({ children }) => {
  // Create the JSS Styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" classes={{ root: classes.listRoot }}>
        {children}
      </List>
    </div>
  );
};
