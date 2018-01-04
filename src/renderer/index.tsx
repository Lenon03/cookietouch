import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import "./js/app";
import "bootstrap"; // tslint:disable-line
import "./styles/index.scss";

ReactDOM.render(
  <App />,
  document.getElementById("app"),
);
