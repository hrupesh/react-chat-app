import React from "react";
import ReactDOM from "react-dom";
import {
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Fade,
} from "shards-react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "./index.css";

import Chat from "chat/Chat";

const App = () => (
  <>
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
  </>
);

ReactDOM.render(<App />, document.getElementById("app"));
