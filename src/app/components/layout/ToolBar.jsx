// External Dependencies
import React from 'react';
import { Grid, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { engagements } from 'data/engagement';
// Component Dependencies

// Style Dependencies
import { appBarHeight, thinBorder } from 'app/styles';

// Create the styles for this component
export const useStyles = makeStyles(theme => ({
  appToolBar: {
    height: `${appBarHeight - theme.spacing(2)}px`,
    borderRight: thinBorder(theme),
    borderLeft: thinBorder(theme),
  },
  view: {
    color: 'white',
    marginTop: -10,
    marginLeft: theme.spacing(2),
  },
  label: {
    paddingTop: theme.spacing(1),
    color: 'white !important',
  },
  select: {
    paddingTop: theme.spacing(1),
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
    width: 100,
  },
  icon: {
    color: 'white !important',
  },
}));

/**
 * Method to render the Application Toolbar given a toolbar name
 * @param {object} props -- Props Contain the name of the toolbar to use
 */
export const ToolBar = ({ toolbar, interview, ...props }) => {
  // Create the JSS Styles
  const classes = useStyles();

  const { engagementId, section } = useParams();

  const history = useHistory();

  // Filter the engagement by the URI
  const [engagement] = engagements.filter(engagement => engagement?.uid === engagementId);

  const handleChange = event => {
    history.push(`/engagements/${engagementId}/${event.target.value}`);
  };

  return (
    <Grid container className={classes.appToolBar}>
      {interview && engagement?.status !== 'POC Docs Request' && (
        <React.Fragment>
          <FormControl size="small" classes={{ root: classes.view }}>
            <InputLabel htmlFor="view" classes={{ root: classes.label }}>
              View
            </InputLabel>
            <Select
              value={section ? 'overview' : 'interview'}
              onChange={handleChange}
              classes={{ root: classes.select, icon: classes.icon }}
            >
              <MenuItem value="overview">Overview</MenuItem>
              <MenuItem value="interview">Interview</MenuItem>{' '}
            </Select>
          </FormControl>
        </React.Fragment>
      )}
    </Grid>
  );
};
