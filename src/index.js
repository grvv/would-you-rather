import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import { createStore } from "redux";

import rootReducer from "./reducers/index";
import middleware from "./middlewares";
import { Provider } from "react-redux";

const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
