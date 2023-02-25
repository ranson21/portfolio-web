import { gql } from '@apollo/client';

// Define the Login Mutation
export const LOGIN = gql`
  mutation Login($token: String!) {
    login(login: { idToken: $token, app: "AuroraAdmin" }) {
      token
    }
  }
`;

// Define the Login Mutation
export const COMPLETE_RESET_PASSWORD = gql`
  mutation CompleteResetPassword($uid: String!) {
    completeResetPassword(uid: $uid, application: "AuroraAdmin") {
      token
    }
  }
`;
