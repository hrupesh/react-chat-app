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
    <Navbar type="dark" theme="primary" expand="md">
      <NavbarBrand href="/">Chat Room</NavbarBrand>
      <NavbarToggler />
    </Navbar>
    <Container>
      <h1 className="display-3">Chat!</h1>
      <Chat />
    </Container>
  </>
);

ReactDOM.render(<App />, document.getElementById("app"));
