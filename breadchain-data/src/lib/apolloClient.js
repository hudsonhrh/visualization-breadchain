// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/73367/breadchain/version/latest',
  cache: new InMemoryCache(),
});

export default client;
