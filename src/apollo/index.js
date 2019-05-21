import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';


const link = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;