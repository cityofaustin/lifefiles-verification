import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./components/App";
// import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import NotarizePage from "./components/NotarizePage";
import ChooseToolPage from "./components/ChooseToolPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router hashType="slash">
      <Routes>
        <Route path="/notarize" element={<NotarizePage />} />
        <Route path="/verify/" element={<App />} />
        <Route path="/" element={<ChooseToolPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
