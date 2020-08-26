import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Container, Col, Row, FormInput, Button } from "shards-react";

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
            paddingBottom: "0.5em",
          }}
        >
          {user !== messageUser && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18px",
                paddingTop: "0.6em",
                textShadow: "0px 0px 4px #08080840",
                boxShadow: "inset 0 0 20px #4a4a4a2e",
              }}
            >
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === messageUser ? "#512DF8" : "#e5e6ea",
              color: user === messageUser ? "white" : "black",
              letterSpacing: 2,
              fontWeight: "400",
              padding: "1em 1.5em",
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
  const [state, stateSet] = React.useState({
    user: "Rupesh",
    content: "",
  });
  return (
    <Container className="mt-4 pb-4">
      <Messages user={state.user} />
      <Row className="px-4">
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={state.user}
            onChange={(e) =>
              stateSet({
                ...state,
                user: e.target.value,
              })
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
