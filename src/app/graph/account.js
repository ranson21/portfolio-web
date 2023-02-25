import { gql } from '@apollo/client';

export const ACCOUNTS = gql`
  query Accounts {
    accounts {
      uid
      name
      type
      status
      createdAt
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $type: String!, $theme: Map) {
    createAccount(account: { name: $name, type: $type, theme: $theme }) {
      uid
      name
      type
      createdAt
    }
  }
`;
