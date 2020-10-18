import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import NotarizePage from "./components/NotarizePage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/notarize">
          <NotarizePage />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
