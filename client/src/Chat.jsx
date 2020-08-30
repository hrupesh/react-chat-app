import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useSubscription,
  useMutation,
  gql,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  Container,
  Col,
  Row,
  FormInput,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Alert,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Fade,
} from "shards-react";
import { animateScroll } from "react-scroll";

const link = new WebSocketLink({
  uri: "ws://localhost:4000/",
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }) => {
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return null;
  }

  useEffect(() => {
    // alert("PageLoaded");
    animateScroll.scrollToBottom({
      containerId: "messages-container",
    });
  });

  return (
    <>
      {data.messages.length > 0 ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/hrupesh/react-chat-app/master/client/assets/no-message.png"
            height="300"
            className="cool-img"
          />
          <h4 className="text-center mt-2 mb-2" style={{ color: "#ee66b2" }}>
            No Messages Yet!
          </h4>
          <h6 className="text-center">Don't be shy, start by saying Hi!</h6>
        </div>
      )}
      <div
        id="messages-container"
        style={{
          maxHeight: "60vh",
          minHeight: "60vh",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        {data.messages.map(({ id, user: messageUser, content }) => (
          <div
            key={id}
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
                  border: "2px solid #ddd",
                  borderRadius: 25,
                  textAlign: "center",
                  fontSize: "18px",
                  paddingTop: "0.6em",
                  background: "#fff",
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
      </div>
    </>
  );
};

const Chat = () => {
  const [state, stateSet] = React.useState({
    user: "",
    content: "",
    dialog: true,
    error: "",
  });

  useEffect(() => {
    // alert("PageLoaded");
    animateScroll.scrollToBottom({
      containerId: "messages-container",
    });
  });

  const [postMessage] = useMutation(POST_MESSAGE);
  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      ...state,
      content: "",
    });
  };

  const hideDialog = () => {
    if (state.user.length < 2) {
      stateSet({
        ...state,
        error: "Your name must have atleast 2 characters , use them here 😅",
      });
    } else {
      stateSet({
        ...state,
        dialog: false,
      });
    }
  };

  const handleToggle = () => {
    stateSet({
      ...state,
      error: "Provide a name before proceeding!",
    });
  };
  return (
    <Container
      className="mt-4 pb-4"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: "60vh",
      }}
    >
      <Modal
        size="lg"
        open={state.dialog}
        toggle={() => handleToggle()}
        centered={true}
        backdrop={true}
      >
        <ModalHeader>What should you be called?</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={8}>
              <FormInput
                style={{ borderRadius: 0 }}
                label="User"
                value={state.user}
                onChange={(e) =>
                  stateSet({
                    ...state,
                    user: e.target.value,
                  })
                }
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    hideDialog();
                  }
                }}
              />
              {state.error ? (
                <Alert theme="danger" fade={true}>
                  {state.error}
                </Alert>
              ) : null}
            </Col>
            <Col>
              <Button block squared theme="success" onClick={hideDialog}>
                Save
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Messages user={state.user} />
      <Row className="px-3">
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            disabled={true}
            valid
            value={state.user}
            onChange={(e) =>
              stateSet({
                ...state,
                user: e.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label="Message"
            value={state.content}
            onChange={(e) =>
              stateSet({
                ...state,
                content: e.target.value,
              })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col
          xs={2}
          style={{
            padding: 0,
          }}
        >
          <Button
            pill
            block
            style={{ backgroundColor: "512DF8", border: 0 }}
            onClick={() => onSend()}
          >
            Send ➡
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Navbar type="dark" style={{ backgroundColor: "#512DF8" }} expand="md">
      <NavbarBrand href="/" style={{ fontSize: "1.6rem", padding: 0 }}>
        Cha
        <span style={{}} className="cool-T">
          T
        </span>{" "}
        Room
      </NavbarBrand>
      <NavbarToggler />
    </Navbar>
    <Fade in={true}>
      <Container className="cstm-nmrc">
        <h4 className="text-center">Start Chatting with Random Strangers</h4>
        <Chat />
      </Container>
    </Fade>
  </ApolloProvider>
);
