import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    messages {
      id
      user
      content
    }
  }
`;

const Chat = () => {
  return <h6>This is a chat window</h6>;
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
