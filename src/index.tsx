import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import Store from "./data/store";

ReactDOM.render(
  <Provider store={Store}>
    <App title="Car Sales"/>
  </Provider>,
  document.getElementById("example")
);
