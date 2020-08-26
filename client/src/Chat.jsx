import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Container } from "shards-react";

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

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES);
  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          style={{
            display: "flex",
            justifyContent: user === messageUser ? "flex-end" : "flex-start",
            padding: "0.5rem",
            paddingBottom: "1em",
          }}
        >
          <div
            style={{
              background: user === messageUser ? "#512DF8" : "#e5e6ea",
              color: user === messageUser ? "white" : "black",
              letterSpacing: 2,
              fontWeight: "500",
              padding: "1em",
              borderRadius: "1em",
              maxWidth: "60%",
              boxShadow: "inset 0px 0 8px 0px #0000002b",
              //   boxShadow: "-26px -26px 63px #4596c5, 26px 26px 63px #65dcff",
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
};

const Chat = () => {
  return (
    <Container>
      <Messages user="Rupesh" />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
