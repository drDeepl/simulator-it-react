import React from "react";
import ReactDOM from "react-dom/client";

import { PrimeReactProvider } from "primereact/api";

import "./assets/index.scss";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
