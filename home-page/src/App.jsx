import React from "react";
import ReactDOM from "react-dom";
import { Container } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "./index.css";

import Chat from "chat/Chat";

const App = () => (
  <Container>
    <p className="h6">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam itaque
      excepturi vitae fuga? Beatae facilis illum quos ipsa, ea amet saepe
      excepturi ducimus? Quam aliquam delectus a ab vitae laudantium.{" "}
    </p>
    <h1 className="display-3">Chat!</h1>
    <Chat />
    <p className="h6">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae,
      laudantium iusto quos optio odio nobis. Atque sequi, velit placeat
      consectetur iste nemo dicta tempore amet. Non facere ut saepe nulla.{" "}
    </p>
  </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
