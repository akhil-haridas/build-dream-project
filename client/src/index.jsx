import React from "react";
import "./styles/color.css";
import "./styles/font.css";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/tailwind.css";
import { Provider } from "react-redux";
import Store from "./store/index.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
