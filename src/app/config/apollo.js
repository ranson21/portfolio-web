import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { LOGIN } from 'app/graph/auth';
import { refreshToken } from 'app/utils/auth';
import { appAlert } from 'app/graph/local';

const handleRefresh = async refresh => {
  // Refresh the ID token
  const token = await refreshToken(refresh);

  // Clear the cache to remove the query with the invalid token
  apolloClient.resetStore();

  // Send the mutation to get a new Access Token
  const {
    data: { login },
  } = await apolloClient.mutate({
    mutation: LOGIN,
    variables: {
      token,
    },
  });

  // Return the refreshed access token
  return login.token;
};

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (networkError?.response?.statusText === 'Unauthorized') {
    // Get the refresh token
    const token = sessionStorage.getItem('refreshToken');

    // Refresh the access token
    handleRefresh(token).then(accessToken => {
      // Replace the token
      sessionStorage.setItem('token', accessToken);

      // Modify the operation context with a new token
      const oldHeaders = operation.getContext().headers;
      operation.setContext({
        headers: {
          ...oldHeaders,
          authorization: `Bearer ${accessToken}`,
        },
      });

      // Retry the request, returning the new observable
      return forward(operation);
    });
  } else {
    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
});

const httpLink = createHttpLink({
  uri: process.env._SERVER,
});

const authLink = setContext((parent, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');

  // Do not attach the header if the operatio is logging in
  if (parent.operationName !== 'Login') {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});

/**
 * Apollo GraphQL Client interface
 */
export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          appAlert: {
            read() {
              return appAlert();
            },
          },
        },
      },
    },
  }),
});
