// External Depedencies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { Alert } from '@material-ui/lab';
import { isEmpty } from 'lodash';

// Component Dependencies
import { GET_APP_ALERTS } from 'app/graph/local';
import { SomethingWentWrong } from 'app/components/shared/SomethingWentWrong';
import { LoadScreen } from 'app/screens/Loading';

// Style dependencies
import { appBarHeight, breadCrumbHeight } from 'app/styles';
import { appAlert } from 'app/graph/local';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: appBarHeight,
    height: `calc(100% - ${appBarHeight}px - ${breadCrumbHeight}px)`,
  },
}));

/**
 * Accounts Screen Component
 */
export const BaseContainer = ({ error, data, loading, children, LoadComponent }) => {
  const { data: alerts } = useQuery(GET_APP_ALERTS);
  const classes = useStyles();

  // Log the errors to the console for debugging
  if (error && data?.code !== 'invalid_token') {
    console.error(error);
  }

  useEffect(() => {
    if (alerts && !isEmpty(alerts?.appAlert)) {
      setTimeout(() => {
        appAlert({});
      }, 3500);
    }
  }, [alerts]);

  return loading || data?.code === 'invalid_token' ? (
    <LoadComponent />
  ) : (
    <Container classes={{ root: classes.root }}>
      {error ? (
        <SomethingWentWrong />
      ) : (
        <React.Fragment>
          {alerts && !isEmpty(alerts?.appAlert) && (
            <Alert classes={{ root: classes.alert }} severity={alerts?.appAlert?.level}>
              {alerts?.appAlert?.message}
            </Alert>
          )}
          {children}
        </React.Fragment>
      )}
    </Container>
  );
};

BaseContainer.defaultProps = {
  LoadComponent: LoadScreen,
};
