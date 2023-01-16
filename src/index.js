import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { XucXacProvider } from "./contextAPI/xucXacContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <XucXacProvider>
      <App />
    </XucXacProvider>
  </React.StrictMode>
);
