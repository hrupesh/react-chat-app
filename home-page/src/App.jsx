import React from "react";
import ReactDOM from "react-dom";
import {
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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
      <NavbarBrand href="/" style={{ fontSize: "1.6rem" }}>
        Cha
        <span
          style={{
            color: "#000",
            fontWeight: "900",
            fontSize: "2rem",
            transform: "rotate3d(1, 0, 0, 180deg)",
            display: "inline-block",
            padding: "2px",
          }}
          className="cool-T"
        >
          T
        </span>{" "}
        Room
      </NavbarBrand>
      <NavbarToggler />
    </Navbar>
    <Container className="my-4">
      <h4 className="text-center">Start Chatting to Random Strangers</h4>
      <Chat />
    </Container>
  </>
);

ReactDOM.render(<App />, document.getElementById("app"));
