import { gql, makeVar } from '@apollo/client';

export const appAlert = makeVar({});

export const GET_APP_ALERTS = gql`
  query GetAppAlerts {
    appAlert @client
  }
`;
