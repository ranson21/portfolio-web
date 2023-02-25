// External Dependencies
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  InputAdornment,
  TextField,
  Button,
  Divider,
  Tooltip,
  CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FilterList as Filter, Add, CloudUpload } from '@material-ui/icons';

// Component Dependencies
import { EmptyContainer } from 'app/components/shared/EmptyContainer';
import { useHistory } from 'react-router';
import { UploadControls } from 'app/components/standards/UploadControls';

// Utility Functions
import { formatName } from 'app/utils/format';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    height: `calc(100vh - ${theme.spacing(20)}px)`,
    overflowX: 'auto',
    width: '100%',
    margin: 'auto',
  },
  filterContainer: {},
  filter: {
    marginTop: 10,
  },
  card: {},
  label: {
    fontWeight: 700,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardTitle: {
    color: theme.palette.primary.contrastText,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardHeader: {
    width: '100%',
    width: 250,
    whiteSpace: 'nowrap',
  },
  cardContent: {
    width: 400,
    padding: 0,
  },
  cardHeaderContainer: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  controlsList: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  listItem: {
    display: 'flex',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

/**
 * HOC renders details or empty projects
 * @param {Object} props -- Props determine whether there are projects to display
 */
export const ControlsList = props => {
  // const [controls, setControls] = useState(props.controls);
  const controls = props.controls?.slice(0, 10);
  const classes = useStyles();

  const Actions = () => (
    <Grid container justify="space-evenly" alignContent="center" classes={{ root: classes.controlsList }}>
      <Grid item>
        <Button variant="contained" startIcon={<CloudUpload />}>
          Import
        </Button>
      </Grid>
      {/* <Grid item>
      <Button variant="contained" color="primary" startIcon={<Add />}>
        New
      </Button>
    </Grid> */}
    </Grid>
  );

  return (
    <Grid container classes={{ root: classes.container }}>
      {controls?.length ? (
        <React.Fragment>
          <Grid item xs={9} classes={{ root: classes.filterContainer }}>
            <TextField
              classes={{ root: classes.filter }}
              label="Filter Controls"
              variant="outlined"
              placeholder="Type to Filter..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Filter />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Actions />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justify="space-evenly" classes={{ root: classes.root }}>
              {controls.map(control => (
                <Grid item key={control[props.primaryField.name]}>
                  <Card classes={{ root: classes.card }}>
                    <CardHeader
                      subheader={
                        <Tooltip title={control[props.primaryField.name]}>
                          <Typography variant="subtitle1" classes={{ root: classes.cardTitle }}>
                            {control[props.primaryField.name]}
                          </Typography>
                        </Tooltip>
                      }
                      classes={{ subheader: classes.cardTitle, content: classes.cardHeader, root: classes.cardHeaderContainer }}
                    />
                    <CardContent classes={{ root: classes.cardContent }}>
                      <List>
                        {props.fields.map(field => (
                          <ListItem classes={{ root: classes.listItem }} divider>
                            <Grid container>
                              <Grid item xs={6}>
                                <Tooltip title={field.name}>
                                  <Typography variant="body1" classes={{ root: classes.label }}>
                                    {field.name}
                                  </Typography>
                                </Tooltip>
                              </Grid>
                              <Grid item xs={6}>
                                <Tooltip title={control[field.name]}>
                                  <Typography variant="body1" classes={{ root: classes.text }}>
                                    {control[field.name]}
                                  </Typography>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </React.Fragment>
      ) : (
        <UploadControls standard={props?.standard} standardId={props.standardId} refresh={props.refresh} />
      )}
    </Grid>
  );
};
