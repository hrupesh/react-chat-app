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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "./index.css";

import Chat from "chat/Chat";

const App = () => (
  <>
    <Navbar type="dark" theme="primary" expand="md">
      <NavbarBrand href="#">Shards React</NavbarBrand>
      <NavbarToggler onClick={this.toggleNavbar} />

      <Collapse open={this.state.collapseOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink active href="#">
              Active
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" disabled>
              Disabled
            </NavLink>
          </NavItem>
          <Dropdown open={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>

        <Nav navbar className="ml-auto">
          <InputGroup size="sm" seamless>
            <InputGroupAddon type="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroupText>
            </InputGroupAddon>
            <FormInput className="border-0" placeholder="Search..." />
          </InputGroup>
        </Nav>
      </Collapse>
    </Navbar>
    <Container>
      <h1 className="display-3">Chat!</h1>
      <Chat />
    </Container>
  </>
);

ReactDOM.render(<App />, document.getElementById("app"));
